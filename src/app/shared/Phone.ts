export class PhoneNumber {
    country = '91';
    phoneNumber: string;

    get e164() {
      const num = this.country + this.phoneNumber;
      return `+${num}`;
    }

}
