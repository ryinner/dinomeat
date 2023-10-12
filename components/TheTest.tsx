export function TheTest () {
  return <form name='test' method='POST' action='/api/products/1/images' encType="multipart/form-data">
    <input type='file' name='image' required />
    <button type='submit'>Save</button>
  </form>
}