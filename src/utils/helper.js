import jwtDecode from 'jwt-decode';
import * as CryptoJS from 'crypto-js';
import { PASSWORD_ENCRYPT } from './config';
import * as XLSX from 'xlsx';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { format } from 'date-fns';

export const encrypt = password => {
  return CryptoJS.AES.encrypt(password, PASSWORD_ENCRYPT).toString();
};

export const decrypt = hash => {
  return CryptoJS.AES.decrypt(hash, PASSWORD_ENCRYPT).toString(
    CryptoJS.enc.Utf8
  );
};

export const checkTokens = () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    const accessToken = localStorage.getItem('accessToken');

    if (!refreshToken && !accessToken) {
      return false;
    }

    // first check, if you have a valid access_token
    if (accessToken) {
      // accessToken may be invalid, or expired, or no refreshToken or refreshToken present or refreshToken may be invalid
      try {
        // decode the token
        // invalid or malformed token will throw error
        const atoken = jwtDecode(accessToken);

        let exp = null;

        if (atoken && atoken?.exp) {
          exp = atoken.exp;
        }

        // if no exp date or expired exp date
        if (!exp || exp < new Date().getTime() / 1000) {
          // invalid accessToken
          // now check for refreshToken
          if (refreshToken) {
            const rtoken = jwtDecode(refreshToken);
            let exp = null;

            if (rtoken && rtoken?.exp) {
              exp = rtoken.exp;
            }

            // if no exp date or expired exp date

            if (!exp || exp < new Date().getTime() / 1000) {
              return false;
            }
          } else {
            return false;
          }
        }
      } catch {
        // invalid accessToken
        // now check for refreshToken
        if (refreshToken) {
          const rtoken = jwtDecode(refreshToken);

          let exp = null;

          if (rtoken && rtoken?.exp) {
            exp = rtoken.exp;
          }

          // if no exp date or expired exp date
          if (!exp || exp < new Date().getTime() / 1000) {
            return false;
          }
        } else {
          return false;
        }
      }
    } else {
      // we have refreshToken
      // check if refreshToken exists or not
      const rtoken = jwtDecode(refreshToken);
      let exp = null;

      if (rtoken && rtoken?.exp) {
        exp = rtoken.exp;
      }

      // if no exp date or expired exp date
      if (!exp || exp < new Date().getTime() / 1000) {
        return false;
      }
    }

    // valid token
    return true;
  } catch (e) {
    return false;
  }
};

export const getTokens = () => {
  // check if the user has a valid or a access_token refresh_token
  if (checkTokens()) {
    return {
      accessToken: localStorage.getItem('accessToken'),
      refreshToken: localStorage.getItem('refreshToken'),
    };
  }

  removeTokens();
  return {
    accessToken: null,
    refreshToken: null,
  };
};

export const saveTokens = (accessToken, refreshToken) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};

// fn to save new access token
export const saveAccessTokens = accessToken => {
  localStorage.setItem('accessToken', accessToken);
};

// fn to remove tokens
export const removeTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('refreshToken');
};

export const saveUser = user => {
  localStorage.setItem('SVT_USER', JSON.stringify(user));
};

export const getUser = () => {
  if (checkTokens()) {
    return JSON.parse(localStorage.getItem('SVT_USER'));
  }

  removeTokens();
  return {
    user: null,
  };
};

export const getCurrency = (amount, decimal) => {
  return (amount / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',

    minimumFractionDigits: decimal ? 2 : 0,
  });
};

export const handleError = err => {
  let message =
    typeof err?.response !== 'undefined'
      ? err?.response?.data?.error || err?.response?.data?.message
      : err?.message;

  const res = err.response;

  if (res && res.status === 401) {
    // removeTokens();
    // window.location.href = '/login';
  } else if (res && res.status === 400) {
    return message;
  } else if (res && res.status === 403) {
    message = message || 'You are not authorized to perform this action';
  } else if (res && res.status === 404) {
    message = message || 'Resource not found';
  } else if (res && res.status === 500) {
    message = 'Internal server error';
  } else if (res && res.status === 0 && !navigator.onLine) {
    message = 'OFFLINE!, Please Check your internet connection';
  } else if (res && res.status === 0 && navigator.onLine) {
    message = 'SERVER DOWN, Please try again later.';
  } else {
    return message;
  }

  return message;
};

export const calculateGST = amount => {
  // Assuming the amount is stored in a variable called "amount"
  let gst = amount * 0.05; // Calculate 5% of the amount as GST
  return amount + gst; // Add GST to the amount to get the total amount
};

export const checkIsAdmin = user => {
  if (user.role === 'admin') {
    return true;
  }
  return false;
};

// export const statusColor = {
//   'Valid Email': '#33B5A6',
//   'Valid Emails': '#33B5A6',
//   'Total Email': '#72A7FF',
//   Unknown: '#D7AF61',
//   'Invalid Email': '#D76761',
//   'Invalid Emails': '#D76761',
//   'Catch All': '#D76761',
// };

export const statusColor = (status, opacity = 1) => {
  const colors = {
    'Valid Email': `rgb(51, 181, 166,${opacity})`,
    'Valid Emails': `rgb(51, 181, 166,${opacity})`,
    'Total Email': `rgb(114, 167, 255,${opacity})`,
    Unknown: `rgb(215, 175, 97,${opacity})`,
    'Invalid Email': `rgb(215, 103, 97,${opacity})`,
    'Invalid Emails': `rgb(215, 103, 97,${opacity})`,
    'Catch All': `rgb(215, 103, 97,${opacity})`,
    Free: `rgb(100, 167, 221,${opacity})`,
    Disposable: `rgb(164, 92, 255,${opacity})`,
  };

  return colors[status];
};

export const downloadAsExcel = (data, fileName, fields, isWhatsapp) => {
  const selectField = { ...fields };
  for (let prop in selectField) {
    selectField[prop] = true;
  }

  const finalData = filterArrayOfObjects(data, selectField);

  const updatedArray = finalData.map(obj =>
    Object.keys(obj).reduce(
      (acc, key) => ({
        ...acc,
        [fields[key] || key]: obj[key],
      }),
      {}
    )
  );

  const worksheet = XLSX.utils.json_to_sheet(updatedArray);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  if (isWhatsapp) {
    var wopts = { bookType: 'xlsx', bookSST: false, type: 'buffer' };

    var wbout = XLSX.write(workbook, wopts);
    var fdata = new FormData();

    fdata.append(
      'wbout',
      new File([wbout], `${fileName.trim()}`, {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,',
      })
    );

    // uploadToS3(fdata, 'wbout');

    for (var pair of fdata.entries()) {
      return uploadToS3(pair[1]);
    }
  } else {
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  }
};

export const uploadToS3 = async (file, name) => {
  const s3 = new S3Client({
    region: 'ap-south-1',
    credentials: {
      accessKeyId: 'AKIAWUM26NDP6EKQQLJT',
      secretAccessKey: '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',
      // region: 'ap-south-1',
      // signatureVersion: 'v4',
    },
  });

  if (!file) {
    return;
  }

  // const params = {
  //   Bucket: 'My-Bucket-Name',
  //   Key: `${Date.now()}.${file.name}`,
  //   Body: file,
  // };

  const user = getUser();

  const s3Params = {
    Bucket: 'svt-test',
    Key: `${user.name}-${file.name.trim()}-${format(
      new Date(),
      'dd-MM-yy h:m'
    )}.xlsx`,
    ContentType:
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    // Expires: 60,
    Body: file,
  };
  const command = new PutObjectCommand(s3Params);

  try {
    const data = await s3.send(command);
    // process data.
  } catch (error) {
    // error handling.
  } finally {
    // finally.
  }

  // const { Location } = await s3.upload(s3Params).promise();

  return {
    Location: `https://svt-test.s3.ap-south-1.amazonaws.com/${s3Params.Key}`,
    filename: `${file.name.trim()}-${format(new Date(), 'dd/MM/yy h:m')}.xlsx`,
  };
};

export const combineToSingleObject = array => {
  const outputArray = [];

  for (let i = 0; i < array?.length; i++) {
    const obj = array[i];
    const newObj = {};

    for (let prop in obj) {
      if (typeof obj[prop] !== 'object') {
        newObj[prop] = obj[prop];
      } else {
        const nestedObj = obj[prop];
        for (let nestedProp in nestedObj) {
          newObj[nestedProp] = nestedObj[nestedProp];
        }
      }
    }

    outputArray.push(newObj);
  }

  return outputArray;
};

function filterArrayOfObjects(array, filter) {
  const outputArray = [];

  for (let i = 0; i < array.length; i++) {
    const obj = array[i];
    const newObj = {};

    for (let prop in filter) {
      if (obj.hasOwnProperty(prop) && filter[prop]) {
        newObj[prop] = obj[prop];
      }
    }

    outputArray.push(newObj);
  }

  return outputArray;
}

// export const combineToSingleObject = arrayOfObjects => {
//   const combinedObject = {};
//   for (let i = 0; i < arrayOfObjects?.length; i++) {
//     const obj = arrayOfObjects[i];

//     for (let prop in obj) {
//       if (typeof obj[prop] === 'object') {
//         for (let nestedProp in obj[prop]) {
//           combinedObject[nestedProp] = obj[prop][nestedProp];
//         }
//       } else {
//         combinedObject[prop] = obj[prop];
//       }
//     }
//   }
//   return combinedObject;
// };
