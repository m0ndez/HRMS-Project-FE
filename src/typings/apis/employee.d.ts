declare interface IRequestCreateEmployee {
  fname: string;
  lname: string;
  address: string;
  tel: string;
  sex: number;
  position: string;
  username: string;
  password: string;
}

declare interface IResponseCreateEmployee {
  id: string;
}

declare interface IResponseGetEmployeeDetail {
  id: string;
  fname: string;
  lname: string;
  address: string;
  tel: string;
  sex: number;
  position: string;
  username: string;
  password: string;
  state: boolean;
}

declare interface IResponseGetEmployee {
  id: string;
  fname: string;
  lname: string;
  address: string;
  tel: string;
  sex: number;
  position: string;
  username: string;
  password: string;
  state: boolean;
  created: string;
}
