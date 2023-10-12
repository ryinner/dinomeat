// import Image from 'next/image';

export function TheTest () {
  return <form name='test' method='POST' action='/api/products/1/images' encType="multipart/form-data">
    <input type='file' name='image' required />
    <button type='submit'>Save</button>
    {/* <Image width={500} height={500} src='/resources/products/1/1.jpg' alt='123'/> */}
  </form>
}