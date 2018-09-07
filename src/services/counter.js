import ioUtil from '../util/ioUtil';

export async function getdatewether() {
  return ioUtil.post(
    '/api',
    {},
    {
      headers: {
        'Accect-token': '2222222222222',
      },
    }
  );
}
