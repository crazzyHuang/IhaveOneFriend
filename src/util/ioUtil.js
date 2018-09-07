const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

async function fetchCore(url, options) {
  try {
    return fetch(url, options);
  } catch (error) {
    throw console.error(
      '网络请求错误!',
      error.status || '-1',
      error.statusText || error || 'fetch request failed.'
    );
  }
}

async function checkStatus(response, config) {
  if (response.status >= 200 && response.status < 300) {
    switch (response.status) {
      case 200: {
        const contentType = response.headers.get('Content-Type');
        if (contentType) {
          const lowerContentType = contentType.toLowerCase();
          if (lowerContentType.includes('application/json')) {
            return response.json(); // 返回Promise对象
          } else {
            // TODO:暂未考虑其他格式,后续在扩展
            return response;
          }
        } else {
          return response;
        }
      }
      case 201: {
        return response.json();
      }
      default: {
        // 204 -- delete操作 -- 空response
        return response;
      }
    }
  } else if (response.status >= 300 && response.status < 400) {
    throw console.error('网络请求', response.status);
  } else {
    const errortext = codeMessage[response.status] || response.statusText;
    if (config.isNotice) {
      console.error(`请求错误 ${response.status}: ${response.url}`, errortext);
    }

    if (response.status >= 400 && response.status < 500) {
      switch (response.status) {
        case 401: {
          if (config.respRedirect401) {
            if (config.isJumpPage) {
              // router.go('/exception/401');
            }
            throw new Error('网络请求401');
          } else {
            return response.json();
          }
        }
        case 403: {
          if (config.isJumpPage) {
            // router.go('/exception/403');
          }
          const error = await response.json();
          throw console.error('网络请求401', error);
        }
        case 404: {
          if (config.isJumpPage) {
            // router.go('/exception/404');
          }
          const error = await response.json();
          throw console.error('网络请求404', error);
        }
        default: {
          const error = await response.json();
          throw console.error('未知网络请求错误', error);
        }
      }
    } else if (response.status >= 500) {
      if (config.isJumpPage) {
        // router.go('/exception/500');
      }
      const error = await response.json();
      throw console.error('网络请求500', error);
    } else {
      const error = await response.json();
      throw console.error('网络请求500', error);
    }
  }
}

async function requestCore(url, body, method, options) {
  const opts = options || {};

  const defaultHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  const defaultConfig = {
    reqEvalJSON: true,
    respRedirect401: true,
    isJumpPage: true,
    isNotice: true,
  };

  // 删除Content-Type，request和response (也包括fetch()方法)会自动设置content type。
  // 共有以下类型的实例｛ArrayBuffer,ArrayBufferView,Blob/File,String,URLSearchParams,FormData｝，使用自动设置content type
  // 特别地对于FormData类型的实例，无法手动提前获取并设置content type的boundary分段字符值，须自动设置。
  if (body && body.constructor !== Object && body.constructor !== Array) {
    delete defaultHeaders['Content-Type'];
    delete defaultHeaders.Accept;
    delete defaultConfig.reqEvalJSON;
  }

  const headers = Object.assign(defaultHeaders, opts.headers || {});

  const config = Object.assign(defaultConfig, opts.config || {});

  let requestBody = body;
  if (method === 'GET') {
    requestBody = undefined;
  } else if (config.reqEvalJSON) {
    requestBody = JSON.stringify(body);
  } else {
    requestBody = body;
  }

  try {
    // 使用await等待fetchCore成功执行reosolve,返回response对象。
    const response = await fetchCore(url, {
      method,
      headers,
      credentials: 'include',
      body: requestBody,
    });
    return checkStatus(response, config);
  } catch (error) {
    throw error;
  }
}

/**
 * IO操作对外接口
 */
const ioUtil = {
  async request(url, body, method, options) {
    return requestCore(url, body, method, options);
  },
  async get(url, options) {
    return requestCore(url, '', 'GET', options);
  },
  async post(url, body, options) {
    return requestCore(url, body, 'POST', options);
  },
  async put(url, body, options) {
    return requestCore(url, body, 'PUT', options);
  },
  async delete(url, body, options) {
    return requestCore(url, body, 'DELETE', options);
  },
};

export default ioUtil;
