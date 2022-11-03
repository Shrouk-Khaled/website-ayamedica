//Events Page Functions
function bookDoctor(doctor) {
    sessionStorage.setItem(
        "DoctorPay_Data",
        JSON.stringify({
            name: doctor.name,
            clinicName: doctor.clinicName,
            location: doctor.location,
            description: doctor.description,
            packageIncludes: doctor.packageIncludes,
            locations: doctor.locations,
        })
    );
}

function getDoctorCard_HTML(doctor, id) {
    return `
        <div  class="doctor-card">
            <div class= "docImgDiv"><img src="${doctor.imgPath}" loading="eager"
                sizes="(max-width: 479px) 30vw, (max-width: 1439px) 68vw, 852px" height="125" width="125" alt=""
                class="doctor-img">
            </div>
            <div class="doctor-details">
                <div class="title-box">
                    <span class="title-name">Doctor's Name: </span>
                    <span class="title-text">${doctor.name}</span>
                </div>
                <div class="title-box">
                    <span class="title-name">Clinic's Name: </span>
                    <span class="title-text">${doctor.clinicName} </span>
                </div>
                <div class="title-box">
                    <span class="title-name">Link: </span>
                    <span class="title-text"><a class="herf-style"
                        href=${doctor.link}>${doctor.link}</a>
                    </span>
                </div>
                <div class="title-box">
                    <span class="title-name">Location: </span>
                    <span class="title-text">${doctor.location}</span>
                </div>
                <div class="title-box">
                    <span class="title-name">Description: </span>
                    <span class="title-text">${doctor.description.split("\n")[0]
        }</span>
                </div>
            </div>
            <div class="book-box" >
                <a class="watch-btn" id= "book-btn-${id}" href="payment.html?doctor=${doctor.name
        }">Book Now</a>
            </div>
        </div>
`;
}

//Payment Page Functions
function setDoctorPayment_Info(doctor) {
    document.querySelector(".doctor-name span").innerText = doctor.name;
    document.querySelector(".clinic-name span").innerText = doctor.clinicName;
    const locationDiv = document.querySelector(".doctor-location .locations");
    sessionStorage.setItem('location_package', JSON.stringify({//Set Default Location_Info
        mohafza: doctor.locations[0].mohafza,
        price: doctor.locations[0].price,
        foreign_OverDay: doctor.locations[0].foreign_OverDay,
    }));
    for (const i in doctor.locations) {
        if (i == 0) {
            locationDiv.insertAdjacentHTML(
                "beforeend",
                `<button class="location-btn active" id='location-btn-${i}'>${doctor.locations[i].name}</button>`
            );
            
            document.getElementById(`location-btn-${i}`).onclick = (e) => {
                setPackage_Info(doctor, i);
                document.getElementById(`location-btn-${parseInt(i)}`).classList.add('active');
                let c;
                for(c= 0 ; c < doctor.locations.length; c++){
                    if(parseInt(i) !== c){
                        document.getElementById(`location-btn-${c}`).classList.remove('active')
                    }
                }
            };
        } else {
            locationDiv.insertAdjacentHTML(
                "beforeend",
                `<button class="location-btn " id='location-btn-${i}'>${doctor.locations[parseInt(i)].name}</button>`
            );
            document.getElementById(`location-btn-${parseInt(i)}`).onclick = (e) => {
                setPackage_Info(doctor, i);
                document.getElementById(`location-btn-${parseInt(i)}`).classList.add('active');
                let c;
                for(c= 0 ; c < doctor.locations.length; c++){

                    if(parseInt(i) !== c){
                        document.getElementById(`location-btn-${c}`).classList.remove('active')
                    }
                }
            };
        }
    }
    document.querySelector(".doctor-description span").innerText = doctor.description;
    const packageDiv = document.querySelector(".package-includes .package-list");
    doctor.locations[0].package.forEach((pack, i) => {
        i === 0
            ? packageDiv.insertAdjacentHTML(
                "beforeend",
                `<li>${pack}<p><a href='${doctor.locations[0].link}' target="_blank">${doctor.locations[0].link}</a></p></li>`
            )
            : packageDiv.insertAdjacentHTML("beforeend", `<li>${pack}</li>`);
    });
}

//function to set package dependes on clinc's location
function setPackage_Info(doctor, index) {
    const packageDiv = document.querySelector(".package-includes .package-list");
    packageDiv.innerHTML = "";
    // console.log(doctor.locations[index]);
    sessionStorage.setItem('location_package', JSON.stringify({
        mohafza: doctor.locations[index].mohafza,
        price: doctor.locations[index].price,
        foreign_OverDay: doctor.locations[index].foreign_OverDay,
    }));

    doctor.locations[index].package.forEach((pack, i) => {
        i === 0
            ? packageDiv.insertAdjacentHTML(
                "beforeend",
                `<li>${pack}<p><a href='${doctor.locations[index].link}' target="_blank">${doctor.locations[index].link}</a></p></li>`
            )
            : packageDiv.insertAdjacentHTML("beforeend", `<li>${pack}</li>`);
    });
}


//function to set data for the calender
function setCalender(monthIndex, firstIndex, lastIndex, country) {
    console.log(country);
    const months = ['Nov', 'Dec'];
    const months_numbers = [11, 12];
    const date = new Date();
    date.setDate(1)
    const firstDayIndex = firstIndex;
    const nextDays = lastIndex;
    const lastDay = new Date(date.getFullYear(), months_numbers[monthIndex], 0).getDate()
    const prevLastDay = new Date(date.getFullYear(), months_numbers[monthIndex] - 1, 0).getDate() 
    let lastClickedDay= ""; 

    document.querySelector('.month-div span h3').innerHTML = `${months[monthIndex]} 2022`;
    let days = '';
    const monthDiv = document.querySelector('.days');

    for (let x = firstDayIndex; x > 0; x--) {
        days += `<div class='prev-day'>${prevLastDay - x + 1}</div>`
    }

    for (let i = 1; i <= lastDay; i++) {
        if (months_numbers[monthIndex] == 11) {//if Novamber
            if (i < 20) {
                days += `<div class='prev-day'>${i}</div>`
            } else {
                days += `<div class='day-clicked-${months[monthIndex]}-${i}'>${i}</div>`;
            }
        }
        else { //if December
            i > 20 ?
                days += `<div class='prev-day'>${i}</div>`
                :
                days += `<div class='day-clicked-${months[monthIndex]}-${i}'>${i}</div>`
        }
        monthDiv.innerHTML = days;
        
    }
    // monthDiv.innerHTML = days;
    monthDiv.insertAdjacentHTML('beforeend', days);

    monthDiv.innerHTML= "";
    for (let y = 1; y <= nextDays; y++) {
        days += `<div class='last-day'>${y}</div>`;
        // monthDiv.innerHTML = days
    }
    monthDiv.insertAdjacentHTML('beforeend', days);


    if(country !== "Egypt"){
        if((months[monthIndex] === "Dec" && sessionStorage.getItem('Calendar_FromDay') <= 18) || (months[monthIndex] === "Nov" && sessionStorage.getItem('Calendar_FromDay') >= 20)){
            document.querySelector(`.day-clicked-${months[monthIndex]}-${sessionStorage.getItem('Calendar_FromDay')}`).style.backgroundColor= "#114b7a";
            document.querySelector(`.day-clicked-${months[monthIndex]}-${sessionStorage.getItem('Calendar_FromDay')}`).style.color= "#fff";
        }

        let start= parseInt(sessionStorage.getItem('Calendar_FromDay'));
        let end= parseInt(sessionStorage.getItem('Calendar_ToDay') < start? (30-start) : sessionStorage.getItem('Calendar_ToDay'));
        if(sessionStorage.getItem('Calendar_ToDay') <= start){
            sessionStorage.setItem('Shifted_To_DEC', true);
        }

        if(sessionStorage.getItem('Shifted_To_DEC') && months[monthIndex] === 'Dec'){
            end= parseInt(sessionStorage.getItem('Calendar_ToDay'))
            start= (start < end? parseInt(sessionStorage.getItem('Calendar_FromDay')): 0);
            sessionStorage.setItem('Shifted_To_DEC', false);
            
        }

        for(let x= start + 1 ; x < end ; x++){
            document.querySelector(`.day-clicked-${months[monthIndex]}-${x}`).style.backgroundColor= "#fff";
            document.querySelector(`.day-clicked-${months[monthIndex]}-${x}`).style.color= "#114b7a";
            document.querySelector(`.day-clicked-${months[monthIndex]}-${x}`).style.border= "1px solid #114b7a";
        }
        
        if(document.querySelector(`.day-clicked-${months[monthIndex]}-${sessionStorage.getItem('Calendar_ToDay')}`)){
            document.querySelector(`.day-clicked-${months[monthIndex]}-${sessionStorage.getItem('Calendar_ToDay')}`).style.backgroundColor= "#114b7a";
            document.querySelector(`.day-clicked-${months[monthIndex]}-${sessionStorage.getItem('Calendar_ToDay')}`).style.color= "#fff";
        }
        // document.querySelector('.dayDiv').style.display = 'block';
        // var showDate_Span= document.getElementById('day-choose-text');
        // if(sessionStorage.getItem('Calendar_ToMonth')){
        //     showDate_Span.innerHTML = `<i style= "color: grey;">From:</i> ${sessionStorage.getItem('Calendar_FromDay')}/${months_numbers[sessionStorage.getItem('Calendar_FromMonth')]}/2022 <i style= "color: grey;">To:</i> ${sessionStorage.getItem('Calendar_ToDay')}/${months_numbers[sessionStorage.getItem('Calendar_ToMonth')]}/2022`;
        // }


        // console.log(document.querySelector('.Calendar-Disabled-Div').style.backgroundColor);
        if(document.querySelector('.Calendar-Disabled-Div').style.backgroundColor === "rgba(0, 0, 0, 0.12)"){
            //All Validation Cases Done
            const checkIn= parseInt(sessionStorage.getItem("Calendar_FromDay"));
            const checkOut= parseInt(sessionStorage.getItem("Calendar_ToDay"));
            // console.log(checkIn, checkOut);
            document.querySelector('.dayDiv').style.display = 'block';
            var showDate_Span= document.getElementById('day-choose-text');
            // .priceDiv .total-price
            var totalDays= 0;
            if( ((checkIn >= 20 && checkIn <= 30) && (checkOut > 20)) ||
                ((checkIn < 20 ) && (checkOut <= 20))
            ){// (30>= F >= 20 &&  T > 20) || (F < 20 &&  T <= 20)
                totalDays= (checkOut - checkIn);
            }else if( (checkIn >= 20 && checkIn <= 30) && (checkOut <= 20) ){
                totalDays= (30 - checkIn) + checkOut;

            }
            // console.log( parseInt(sessionStorage.getItem('total_Price')),  parseInt(JSON.parse(sessionStorage.getItem('location_package')).foreign_OverDay), totalDays );
            const total_Price= parseInt(sessionStorage.getItem('total_Price')) + (parseInt(JSON.parse(sessionStorage.getItem('location_package')).foreign_OverDay)* (totalDays - 3));
            document.querySelector('.total-price #price-text').innerText= `${total_Price}$`;
            showDate_Span.innerHTML = `<i style= "color: grey;">From:</i> ${sessionStorage.getItem('Calendar_FromDay')}/${months_numbers[sessionStorage.getItem('Calendar_FromMonth')]}/2022 <i style= "color: grey;">To:</i> ${sessionStorage.getItem('Calendar_ToDay')}/${months_numbers[sessionStorage.getItem('Calendar_ToMonth')]}/2022`;
        }

    }else{
        //AddOnClickEventListener To Each Day
        for (let i = 1; i <= lastDay; i++) {
            if (months_numbers[monthIndex] == 11) {
                i < 20 ? ''
                    :
                    document.querySelector(`.day-clicked-${months[monthIndex]}-${i}`).addEventListener('click', (ev) => {
                        document.querySelector('.goBook-btn').removeAttribute('disabled');
                        
                        if(lastClickedDay){//Clear Previous Clicked
                            lastClickedDay.style.backgroundColor= "#97b8e92a";
                            lastClickedDay.style.color= "#114b7a";
                        }
                        lastClickedDay= ev.target;
                        lastClickedDay.style.backgroundColor= "#114b7a";
                        lastClickedDay.style.color= "#fff";
                        document.querySelector('.dayDiv').style.display = 'block'
                        document.getElementById('day-choose-text').innerHTML = i + '/' + months_numbers[monthIndex] + '/' + 2022;
                    });
            }else{
                i > 20 ? ''
                    :
                    document.querySelector(`.day-clicked-${months[monthIndex]}-${i}`).addEventListener('click', (ev) => {
                        document.querySelector('.goBook-btn').removeAttribute('disabled');
                        if(lastClickedDay){//Clear Previous Clicked
                            lastClickedDay.style.backgroundColor= "#97b8e92a";
                            lastClickedDay.style.color= "#114b7a";
                        }
                        lastClickedDay= ev.target;
                        lastClickedDay.style.backgroundColor= "#114b7a";
                        lastClickedDay.style.color= "#fff";
                        document.querySelector('.dayDiv').style.display = 'block';
                        document.getElementById('day-choose-text').innerHTML = i + '/' + months_numbers[monthIndex] + '/' + 2022;
                        
                    });
            }
           


        }
    }
     
}

function handleOnClickedDay( bookedDays, country, selectedDayIndex, months_numbers, monthIndex, lastClickedDay, showDate_Div, showDate_Span){
    lastClickedDay.style.backgroundColor= "#114b7a";
    lastClickedDay.style.color= "#fff";
    showDate_Div.style.display = 'block';
    sessionStorage.setItem('selectedDayIndex', selectedDayIndex);
    if(country === "Egypt"){
        showDate_Span.innerHTML = `${selectedDayIndex}/${months_numbers[monthIndex]}/2022`;
    }else{
        sessionStorage.setItem("PrevBookedDays", bookedDays);
        var shiftedDays= 0;
        if(months_numbers[monthIndex] === 11 && selectedDayIndex + (bookedDays - 1) > 30){//handleNovaber
            sessionStorage.setItem("fromNov_toDec_days", (selectedDayIndex + (bookedDays - 1)) - 30 );
            shiftedDays= sessionStorage.getItem('fromNov_toDec_days');
        }else{
            shiftedDays= sessionStorage.getItem('fromNov_toDec_days');
        }
        for(let c= 1; c < bookedDays - shiftedDays; c++){
            document.querySelector(`.day-clicked-${(selectedDayIndex + c)}`).style.backgroundColor= "#033d932a";
            document.querySelector(`.day-clicked-${(selectedDayIndex + c)}`).style.color= "#114b7a";
            document.querySelector(`.day-clicked-${(selectedDayIndex + c)}`).style.border= "1px solid #114b7a";
        }
        if(selectedDayIndex + (bookedDays - 1) <= 30){
            const theRestDays= shiftedDays? (bookedDays - shiftedDays - 1) : bookedDays - 1;
            document.querySelector(`.day-clicked-${(selectedDayIndex +  theRestDays)}`).style.backgroundColor= "#114b7a";
            document.querySelector(`.day-clicked-${(selectedDayIndex + theRestDays)}`).style.color= "#fff";
        }
        showDate_Span.innerHTML = `<i style= "color: grey;">From:</i> ${selectedDayIndex}/${months_numbers[monthIndex]}/2022 <i style= "color: grey;">To:</i> ${(selectedDayIndex + (bookedDays-1)) % 30}/${(shiftedDays? 12: 11)}/2022`;
        


    }
    
}


function handleBookForm() {
    document.getElementById("Book-Form").style.display = "block";
}

function HandleCalender() {
    document.getElementById("goBook-Day").style.display = "block";
}


//Events Page
if (document.title === "Events") {
    var Doctors_Data = [
        //Doctor Assem
        {
            imgPath: "images/drassem.jpg",
            name: "Assem Zahran",
            clinicName: "International Femto Lasik Centre - Zahran Eye Center",
            link: "https://youtu.be/T0qQ21D2_fg",
            location: "New Cairo - Damiette",
            description: `Dr. Assem Zahran is a consultant ophthalmologist who provides the most advanced refractive eye procedures for vision correction, leveraging the centers' cutting-edge technology. Dr. Assem has over 20 years of experience in this field.\n
            Dr. Assem Zahran is Cataract and low vision surgeries consultant, He invented the keratoconus lift linked with cataract surgery, as well as the procedure for correcting astigmatism associated with cataracts. Dr. Zahran is the inventor of the present theory of lateral strabismus and the discoverer of the method of treating lateral strabismus without surgery. He discovered seven new migraine triggers related to eye muscles. He was awarded International certifications of excellence for obtaining the greatest global rates in femto lasik, LASIK SPK, and multifocal lens implants. Furthermore, he used femtolaser technology to execute seven new operations for the first time in the world. He developed the circular fragmentation approach to cure fossilized cataracts. Dr. Zahran was the first in the world to implant a second secondary lens. He is the director of the International Femtolasik Center (IFLC) The International Femtolasik Center (IFLC)which is one of nine worldwide accredited centers in femto smile and femto lasik surgeries.`,
            packageIncludes: [
                "Meet and Assist",
                "Hotel accommodation",
                "Transportaion",
            ],
            locations: [
                {
                    name: "International Femto Lasik Centre - New Cairo",
                    link: "https://triumphhotel.com/luxury-home",
                    package: [
                        "Accommodation at Truimph Hotel / 3 nights accommodation on bb basis sgl room .",
                        "One Meet and Assist at cairo airport upon arrival",
                        "Two transfers from /to cairo airport ",
                    ],
                    mohafza: "cairo",
                    price:{egy: 400, foreign: 1010},
                    foreign_OverDay: 170
                },
                {
                    name: "Zahran Eye Center - Damiette",
                    link: "https://www.steigenberger.com/en/hotels/all-hotels/egypt/damietta/steigenberger-hotel-el-lessan",
                    package: [
                        "Accommodation at Steigenberger El Lesan  / 3 nights accommodation on bb basis sgl room.",
                        "One Meet and Assist at cairo airport upon arrival",
                        "Two transfers from /to cairo airport ",
                    ],
                    mohafza: "damiette",
                    price:{egy: 300, foreign: 890},
                    foreign_OverDay: 100
                },
            ],
        },
        //Doctor Magdy
        {
            imgPath: "images/drmagdy.jpg",
            name: "Magdy Khalaf",
            clinicName: "I-Vision",
            link: "https://youtu.be/gHczffuexMg",
            location: "Heliopolis, Cairo",
            description: `Professor of Ophthalmology at Al-Azhar University's Faculty of Medicine University of Amsterdam Fellow, Netherlands University of Regensburg - Germany Fellow Member of the European Society of Cataract and Refractive Surgery and the American Society of Cataract and Refractive Surgery.\n
            Dr. Magdy Khallaf is a corneal, vision correction, and keratoconus surgery consultant. He holds fellowships at the University of Amsterdam and the University of Regensburg in Germany. In addition, he is an honorary president of the International Society of Cataract Surgery. He won an award and a letter of appreciation from the World Eye Conference in Hong Kong for the best study on the treatment of corneal transplant complications, and he has several worldwide keratoconus studies. He is also a corneal and keratoconus surgery consultant at i-vision Eye Hospital in Heliopolis.
            `,
            packageIncludes: [
                "Meet and Assist",
                "Hotel accommodation",
                "Transportaion",
            ],
            locations: [
                {
                    name: "I-Vision - Heliopolis ",
                    link: "https://triumphhotel.com/luxury-home",
                    package: [
                        "Accommodation at Truimph Hotel / 3 nights accommodation on bb basis sgl room .",
                        "One Meet and Assist at cairo airport upon arrival",
                        "Two transfers from /to cairo airport ",
                    ],
                    mohafza: "cairo",
                    price:{egy: 400, foreign: 1010},
                    foreign_OverDay: 170
                },
            ],

        },
        //Doctor Mahmoud
        {
            imgPath: "images/drahmedelmassry.png",
            name: "Ahmed Elmassry",
            clinicName: "Alex Vision Center",
            link: "https://youtu.be/D1S-oRz9Mho",
            location: "Alexandria",
            description: `Dr. Mahmoud Ismail, Professor of Ophthalmology and Head of Ophthalmology at Al-Azhar University, is also a Professor of Ophthalmology at the University of Alicante in Spain.\n
            He is the medical director of Nour Al-Hayah Hospital in Egypt. Moreover, he is the first and only non-Spanish doctor to receive the Spanish National Research Award on a global scale. He is an innovator of the International Innovation Award for Postal Lens Implantation for the Treatment of Ulcers, requiring one horn procedure for three surgeries. Dr. Ismail is a Member of the International Committee of Experts, the Court for Research of the European Association for White Water and Visual Defects, and the European Association for White Water and Visual Defects. He has an annual course at the American Academy conferences in his honor. He is also one of the worldwide doctors that established laser surgery guidelines in the nineties.
            `,
            packageIncludes: [
                "Meet and Assist",
                "Hotel accommodation",
                "Transportaion",
            ],
            locations: [
                {
                    name: "Alex Vision Center ",
                    link: "https://www.marriott.com/en-us/hotels/alysi-sheraton-montazah-hotel/overview/?scid=f2ae0541-1279-4f24-b197-a979c79310b0",
                    package: [
                        "Accommodation at  Sheraton Montazah Hotel / 3 nights accommodation on bb basis sgl room .",
                        "One Meet and Assist at cairo airport upon arrival",
                        "Two transfers from /to cairo airport ",
                    ],
                    mohafza: "alex",
                    price:{egy: 450, foreign: 1050},
                    foreign_OverDay: 100
                },
            ],
        },
        {
            imgPath: "images/drmahmoud.png",
            name: "Mahmoud Ismail",
            clinicName: "Nour Al-Hayah Eye Center",
            link: "https://youtu.be/D1S-oRz9Mho",
            location: "Heliopolis, Cairo",
            description: `Dr. Mahmoud Ismail, Professor of Ophthalmology and Head of Ophthalmology at Al-Azhar University, is also a Professor of Ophthalmology at the University of Alicante in Spain. He is the medical director of Nour Al-Hayah Hospital in Egypt.\n
             Moreover, he is the first and only non-Spanish doctor to receive the Spanish National Research Award on a global scale. He is an innovator of the International Innovation Award for Postal Lens Implantation for the Treatment of Ulcers, requiring one horn procedure for three surgeries. Dr. Ismail is a Member of the International Committee of Experts, the Court for Research of the European Association for White Water and Visual Defects, and the European Association for White Water and Visual Defects. He has an annual course at the American Academy conferences in his honor. He is also one of the worldwide doctors that established laser surgery guidelines in the nineties.`,
            packageIncludes: [
                "Meet and Assist",
                "Hotel accommodation",
                "Transportaion",
            ],
            locations: [
                {
                    name: "Nour Al-Hayah - Heliopolis ",
                    link: "https://triumphhotel.com/luxury-home",
                    package: [
                        "Accommodation at Truimph Hotel / 3 nights accommodation on bb basis sgl room .",
                        "One Meet and Assist at cairo airport upon arrival",
                        "Two transfers from /to cairo airport ",
                    ],
                    mohafza: "cairo",
                    price:{egy: 400, foreign: 1010},
                    foreign_OverDay: 170
                },
            ],
        }
    ];
    var Service_Wrapper = document.querySelector(".Doctors-wrapper");
    let cardHTML = "";
    let counter = 1;
    Doctors_Data.forEach((doctor) => {
        cardHTML = getDoctorCard_HTML(doctor, counter);
        Service_Wrapper.insertAdjacentHTML("beforeend", cardHTML);
        document.getElementById(`book-btn-${counter}`).onclick = (ev) => {
            bookDoctor(doctor);
        };
        counter++;
    });
} else if (document.title === "Payment") {//Payment Page
    const Doctor = JSON.parse(sessionStorage.getItem("DoctorPay_Data"));
    setDoctorPayment_Info(Doctor);
    // document.querySelector('.total-price').style.display= "none";
    document.getElementById("surgey-no").onclick = () => {
        document.getElementById("surgeryDesc").style.display = "none";
    };
    document.getElementById("surgey-yes").onclick = () => {
        document.getElementById("surgeryDesc").style.display = "block";
    };

    document.getElementById('countrySelect').onchange= (ev)=>{
        const location_package= JSON.parse(sessionStorage.getItem('location_package'));
        // document.querySelector('.total-price').style.display= "block";
        

        if(ev.target.value !== "Egypt"){
            sessionStorage.setItem("total_Price", location_package.price.foreign);
            document.querySelector('.goBook-btn').removeAttribute('disabled');
            document.querySelector('.Calendar-Disabled-Div').style.backgroundColor= "rgba(0, 0, 0, 0.12)";
            document.querySelector('.Calendar-Disabled-Div span').innerText= "Please Select Country First!!";
            document.querySelector('.Calendar-Disabled-Div').style.display= "flex";
        }else{
            sessionStorage.setItem("total_Price", location_package.price.egy);
            const total_Price= parseInt(sessionStorage.getItem("total_Price")); 
            document.querySelector('.total-price #price-text').innerText= `${total_Price}$`;
            document.querySelector('.Calendar-Disabled-Div').style.display= "none";
        }
        document.querySelector('.Calendar-Disabled-Div span').style.display= "none";

        

        document.getElementById('day-choose-text').innerText= "";
        (ev.target.value === "Egypt"? document.querySelector('.BookedDaysDiv').style.display= "none": document.querySelector('.BookedDaysDiv').style.display= "flex");
        setCalender(0, 2, 3, ev.target.value);
        document.getElementById('FromBookedDays').onkeyup= (e)=>{
            sessionStorage.setItem("Calendar_FromDay", e.target.value);
            document.getElementById('ToBookedDays').value= "";
            //Detect Dec/Nov From Day Number
            document.querySelectorAll('.BookedDaysDiv >div button')[0].innerText= (parseInt(e.target.value) >= 20? "Novamber": "December");
            // console.log(document.querySelectorAll('.BookedDaysDiv >div button')[0]);

            if( (e.target.value >= 20 && e.target.value <= 30) ){
                sessionStorage.setItem("Calendar_FromMonth", 0);
                // setCalender(0, 2, 3, ev.target.value);
            }else if(e.target.value <= 18){
                sessionStorage.setItem("Calendar_FromMonth", 1);
                // setCalender(1, 4, 0, ev.target.value)
            }
    
        };
    
        document.getElementById('ToBookedDays').onkeyup= (e)=>{
            sessionStorage.setItem("Calendar_ToDay", e.target.value);
            sessionStorage.setItem("Shifted_To_DEC", false);
            //Detect Dec/Nov From Day Number
            document.querySelectorAll('.BookedDaysDiv >div button')[1].innerText= (parseInt(e.target.value) > 20? "Novamber": "December");
                    
            if(Math.abs(document.getElementById('FromBookedDays').value - e.target.value) <= 2 &&
            (document.getElementById('FromBookedDays').value !== "20" && e.target.value !== "20" || e.target.value === "21" || e.target.value === "22")
            ){
                document.querySelector('.dayDiv').style.display = 'none';
                document.querySelector('.Calendar-Disabled-Div').style.backgroundColor= "rgba(0, 0, 0, 0.5)";
                document.querySelector('.Calendar-Disabled-Div').style.display= "flex";
                document.querySelector('.Calendar-Disabled-Div span').innerText= "At Least 2 Days Between Comming And Leaving Day";
                document.querySelector('.Calendar-Disabled-Div span').style.display= "flex";
            }else{
                document.querySelector('.dayDiv').style.display = 'none';
                document.querySelector('.Calendar-Disabled-Div').style.backgroundColor= "rgba(0, 0, 0, 0.12)";
                document.querySelector('.Calendar-Disabled-Div span').innerText= "Please Select Country First!!";
                document.querySelector('.Calendar-Disabled-Div span').style.display= "none";
            }

            if(//Not Valid Cases
                (parseInt(document.getElementById('FromBookedDays').value) < 20 && parseInt(document.getElementById('FromBookedDays').value) > parseInt(e.target.value))|| //From < 20 && From > To 
                (parseInt(document.getElementById('FromBookedDays').value) < 20 && parseInt(e.target.value) > 20)|| //From < 20 && To > 20 
                (parseInt(document.getElementById('FromBookedDays').value) <= 0 || parseInt(e.target.value) <= 0)|| //From <= 0 || To <= 0 
                (parseInt(document.getElementById('FromBookedDays').value) > 30 || parseInt(e.target.value) > 30) //From > 30 || To > 30 
                ){
                document.querySelector('.dayDiv').style.display = 'none';
                document.querySelector('.Calendar-Disabled-Div').style.backgroundColor= "rgba(0, 0, 0, 0.5)";
                document.querySelector('.Calendar-Disabled-Div').style.display= "flex";
                document.querySelector('.Calendar-Disabled-Div span').innerText= "Please Enter A Valid Date!!";
                document.querySelector('.Calendar-Disabled-Div span').style.display= "flex";
            }else{
                //All Validation Cases Done
                if( (e.target.value > 20 && e.target.value <= 30)){
                    sessionStorage.setItem("Calendar_ToMonth", 0);
                    setCalender(0, 2, 3, ev.target.value);
                }else if(e.target.value <= 20){
                    sessionStorage.setItem("Calendar_ToMonth", 1);
                    setCalender(1, 4, 0, ev.target.value)
                }
            }

            
            
        };
    }//End onchange

    sessionStorage.setItem('Calendar_FromDay', 20);
    sessionStorage.setItem('Calendar_ToDay', 23);

    
        
    
    //calender data
    setCalender(0, 2, 3, "Egypt")
    document.querySelector('.next-month').addEventListener('click', () => {
        setCalender(1, 4, 0, "Egypt")
    })
    document.querySelector('.prev-month').addEventListener('click', () => {

        setCalender(0, 2, 3, "Egypt")
    })
}