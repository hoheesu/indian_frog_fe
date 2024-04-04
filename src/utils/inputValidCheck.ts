export function emailValidCheck(email: string) {
  const pattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;
  return pattern.test(email) ? true : false;
}
export function passwordValidCheck(passowrd: string) {
  const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[!@#])[\da-zA-Z!@#]{8,}$/;
  return pattern.test(passowrd) ? true : false;
}
