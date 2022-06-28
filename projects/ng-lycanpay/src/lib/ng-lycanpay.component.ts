import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lib-ng-lycanpay',
  template: ` <div id="lycanpaybutton"></div> `,
  styles: [],
})
export class NgLycanpayComponent implements OnInit {

  @Input() name: any;
  @Input() amount: any;
  @Input() invoiceno: any;
  @Input() currency: any;
  @Input() exp: any;
  @Input() email: any;
  @Input() merchantid: any;
  @Input() payconfirmurl: any;
  @Input() payfailurl: any;
  hostname: any = location.hostname;
  pathname: any = window.location.pathname;
  protocol: any = window.location.protocol;
  args: any = {};
  newWindow: any;
  orderid: any = 0;
  istestmode: any = 0;
  timeDuration: number = 5000;
  paymentInterval: any;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.createArgs();
    this.initLycanPay();
  }

  createArgs() {
    this.args = {
      hostname: this.hostname,
      pathname: this.pathname,
      protocol: this.protocol,
      name: this.name,
      amount: this.amount,
      invoiceno: this.invoiceno,
      currency: this.currency,
      exp: this.exp,
      email: this.email,
      merchantid: this.merchantid,
      payconfirmurl: this.payconfirmurl,
      payfailurl: this.payfailurl,
    };
  }

  initLycanPay() {
    const lycanpaybutton: any = document.getElementById('lycanpaybutton');
    this.http
      .post('https://user.lycanpay.com/GetButtonCode', {
        merchantid: this.args.merchantid,
        hostname: this.args.hostname,
      })
      .subscribe((datas: any) => {
        console.log(datas);
        if (datas.status == 'Success') {
          lycanpaybutton.innerHTML = '' + datas.data + '';
          lycanpaybutton.addEventListener('click', this.buttonClick, false);
        } else {
          lycanpaybutton.innerHTML =
            '<span style="font-color:red">Invalid Marchant Id.</span>';
        }
      });
  }

  buttonClick = () => {
    this.http
      .post('https://user.lycanpay.com/SDK_lycanpay', this.args)
      .subscribe((data: any) => {
        console.log(data);
        if (data.status == 'Success') {
          if (data.data.code == 'Success') {
            this.newWindow = window.open(
              data.data.invoiceurl,
              'lycanpay',
              'directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=no,width=720,height=800'
            );
            this.orderid = data.data.orderno;
            this.istestmode = data.data.istestmode;
            this.getPaymentStatus();
          } else {
            alert(data.data.message);
            console.log(data.data.message);
          }
        } else {
          alert(data.message);
          console.log(data.message);
        }
      });
  };

  getPaymentStatus() {
    this.paymentInterval = setInterval(() => {
      if (this.orderid > 0) {
        console.log(this.orderid);
        this.http
          .post('https://user.lycanpay.com/Get_SDK_PayStatus', {
            orderid: this.orderid,
            istestmode: this.istestmode,
          })
          .subscribe((data: any) => {
            console.log('JS data', data);
            let payment_data = data.payment_data;
            if (data.status == 'Success') {
              if (payment_data.isbuttoninvoice == true) {
                if (payment_data.status_id == 4) {
                  this.newWindow.close();
                  location.href =
                    this.args.payconfirmurl + '?orderno=' + this.orderid;
                } else if (payment_data.status_id == 7) {
                  this.newWindow.close();
                  location.href =
                    this.args.payfailurl + '?orderno=' + this.orderid;
                } else if (payment_data.status_id == 5) {
                  this.newWindow.close();
                  location.href =
                    this.args.payfailurl + '?orderno=' + this.orderid;
                }
              }
            }
            // // $('.loader').hide();
            // const loader:any = document.querySelector(".loader")
            // loader.style.display = 'none';
            console.log(data);
          });
      }
    }, this.timeDuration);
  }

  ngOnDestroy() {
    clearTimeout(this.paymentInterval);
  }
}
