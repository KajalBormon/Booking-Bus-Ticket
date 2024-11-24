var app = Vue.createApp({
    data(){
        return{
            confirmed : false,
            name: "",
            mobile: "",
            appliedCoupon: null,
            couponCode: "",
            coupons:[
                {
                    code: "100TAKAOFF",
                    discount: 100
                },
                {
                    code: "200TAKAOFF",
                    discount: 200
                }
            ],
            seatStates: {
                sold: {
                    text: "Sold",
                    color: "#ff0000"
                },
                available: {
                    text: "Available",
                    color: "#fff"
                },
                selected: {
                    text: "Selected",
                    color: "#00ff00"
                },
                booked: {
                    text: "Booked",
                    color: "#0000ff"
                },
            },

            seats: [
                {
                  name: "A1",
                  type: "available",
                  price: 500
                },
                {
                  name: "A2",
                  type: "available",
                  price: 500
                },
                {
                  name: "A3",
                  type: "available",
                  price: 500
                },
                {
                  name: "A4",
                  type: "available",
                  price: 500
                },
                {
                  name: "B1",
                  type: "available",
                  price: 450
                },
                {
                  name: "B2",
                  type: "available",
                  price: 450
                },
                {
                  name: "B3",
                  type: "available",
                  price: 450
                },
                {
                  name: "B4",
                  type: "available",
                  price: 450
                },
                {
                  name: "C1",
                  type: "sold",
                  price: 500
                },
                {
                  name: "C2",
                  type: "sold",
                  price: 500
                },
                {
                  name: "C3",
                  type: "sold",
                  price: 500
                },
                {
                  name: "C4",
                  type: "sold",
                  price: 500
                },
                {
                  name: "D1",
                  type: "available",
                  price: 400
                },
                {
                  name: "D2",
                  type: "available",
                  price: 400
                },
                {
                  name: "D3",
                  type: "available",
                  price: 400
                },
                {
                  name: "D4",
                  type: "available",
                  price: 400
                },
                {
                  name: "E1",
                  type: "available",
                  price: 300
                },
                {
                  name: "E2",
                  type: "available",
                  price: 300
                },
                {
                  name: "E3",
                  type: "booked",
                  price: 300
                },
                {
                  name: "E4",
                  type: "booked",
                  price: 300
                },
                {
                  name: "F1",
                  type: "available",
                  price: 300
                },
                {
                  name: "F2",
                  type: "available",
                  price: 300
                },
                {
                  name: "F3",
                  type: "available",
                  price: 300
                },
                {
                  name: "F4",
                  type: "available",
                  price: 300
                }
            ]
        };
    },
    computed: {
        seatsSelected(){
            let selected = this.seats.filter(item => item.type == "selected");
            return selected;
        },
        totalCost(){
            let total = 0;
            this.seatsSelected.forEach((seat) => {
                total += seat.price;
            });
            if(this.appliedCoupon !==null){
                total = total- this.appliedCoupon.discount
            }
            return total;
        }
      
    },

    methods: {
        handleClick(i){
            let seatClicked = this.seats[i];
            if(seatClicked.type == 'sold' || seatClicked.type == 'booked'){
                alert("You cannot book this seat");
                return;
            }

            if(seatClicked.type == "available" && this.seatsSelected.length > 2){
                alert('You can not selected more than 3 seats');
                return;
            }

            seatClicked.type = seatClicked.type==="selected" ? "available" : "selected";
        },
        confirm(){
          if(!this.name || !this.mobile){
              alert("Please enter your name and mobile number");
              return;
          }
          this.confirmed = true;
        },
        resetData(){
          this.confirmed = false;
          this.name = "";
          this.mobile = "";
          this.appliedCoupon = null;

          this.seats.forEach(seat=>{
            if(seat.type === "selected"){
                seat.type = "sold";
            }
          });
        }
    },

    watch:{
        couponCode(newValue){
            if(newValue.length == 10){
                let searchedCoupon = this.coupons.filter(item => item.code == newValue);
                if(searchedCoupon.length == 1){
                    this.appliedCoupon = searchedCoupon[0];
                    this.couponCode = "";
                }else{
                    alert("Coupon not valid");
                }
            }    
        }
    }
}).mount("#app");