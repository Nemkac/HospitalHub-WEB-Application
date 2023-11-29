import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-testemonials-page',
  templateUrl: './testemonials-page.component.html'
})
export class TestemonialsPageComponent {
  faStar = faStar;
  images = [
    {id: "1", img: 'team-1.jpg', doctor: 'Dr. James Thompson', hospital: "St. Luke's Medical Center, Chief of Cardiology", header: 'Exceptional Equipment, Exceptional Care',
      text: "As the Chief of Cardiology at St. Luke's, I constantly seek the best resources for patient care. Our recent collaboration with HospitalHub for renting medical equipment has been transformative. The state-of-the-art devices have significantly enhanced our diagnostic capabilities and patient outcomes. The reliability and precision of the equipment, coupled with the seamless support from HospitalHub, have exceeded our expectations. Grateful for this partnership!",
      rating:  5, date: "November 15, 2023"},
      {id: "2", img: 'team-3.jpg', doctor: 'Dr. Emily Rodriguez', hospital: "Mercy General Hospital, Head of Radiology", header: 'Innovative Solutions for Quality Healthcare',
      text: "As the Head of Radiology at Mercy General, I am pleased to endorse HospitalHub for their outstanding medical equipment and services. The cutting-edge imaging technology we've rented has elevated our diagnostic capabilities, allowing for more precise and timely patient care. The efficiency and reliability of the equipment, combined with the exceptional support from HospitalHub's team, have made a significant impact on our department's performance. Highly recommend!",
      rating:  4.5, date: "October 22, 2023"},
      {id: "3", img: 'team-2.jpg', doctor: 'Dr. Michael Turner', hospital: " Metropolitan General Hospital, Director of Surgery", header: 'Empowering Surgical Excellence',
      text: "Leading the surgical team at Metropolitan General, I am delighted to express my satisfaction with HospitalHub. The medical equipment we've rented has been instrumental in enhancing our surgical procedures. The precision and reliability of the instruments have significantly contributed to successful surgeries and improved patient outcomes. The team at HospitalHub has been exceptionally responsive and supportive. Grateful for this partnership that empowers our pursuit of surgical excellence.",
      rating:  4.8, date: "December 5, 2023"}
  ];

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    center: true, // Adjust this option
    dots: false,
    autoHeight: true,
    autoWidth: true,
    margin: 110, // Adjust this option
    stagePadding: 10, // Adjust this option
    responsive: {
        0: {
            items: 1,
        },
        600: {
            items: 2,
        },
        1000: {
            items: 3,
        }
    },
    rtl: false,
  }
}
