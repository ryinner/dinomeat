export function TheTest () {
  return <form name='test' method='POST' action='/api/test' encType="multipart/form-data">
    <input type='file' name='file' required />
    <button type='submit'>Save</button>
  </form>
}