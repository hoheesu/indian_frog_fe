export function emailValidCheck(email: string) {
  const pattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;
  return pattern.test(email) ? true : false;
}
export function passwordValidCheck(passowrd: string) {
  const pattern = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#^()]).{8,15}$/;

  return pattern.test(passowrd) ? true : false;
}
export function certifiedValidCheck(certifiedNum: string) {
  const pattern = /^\d*$/;
  return pattern.test(certifiedNum) ? true : false;
}
