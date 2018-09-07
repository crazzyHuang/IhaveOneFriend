export async function getdatewether() {
  try {
    const respone = await fetch(
      '/api/openapi/BaikeLemmaCardApi?scope=103&format=json&appid=379020&bk_key=%E9%93%B6%E9%AD%82&bk_length=600'
    );
    const result = await respone.json();
    return result;
  } catch (e) {
    console.info('ERRPR!', e);
  }
}
