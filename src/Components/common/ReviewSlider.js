import React from 'react'
import { useRef, useEffect } from 'react';
import ReviewCard from '../Core/Home/ReviewCard';
import { register } from 'swiper/element/bundle';

register();

const ReviewSlider = ({ cards }) => {
  const swiperElRef = useRef(null);

  // useEffect(() => {
  //   // listen for Swiper events using addEventListener
  //   console.log("Cards", cards);
  //   swiperElRef.current.addEventListener('swiperprogress', (e) => {
  //     const [swiper, progress] = e.detail;
  //     // console.log(progress);
  //   });

  //   swiperElRef.current.addEventListener('swiperslidechange', (e) => {
  //     // console.log('slide changed');
  //   });
  // }, []);

  return (
    <div className=' overflow-x-hidden my-[4rem]'>
      <swiper-container
        // ref={swiperElRef}
        // navigation={true}
        pagination={true}
        loop={true}
        autoplay="true"
        speed="1000"
        space-between="1"
        slides-per-view="4"
        // breakpoints={{
        //   0: {
        //     slidesPerView: 1,
        //   },
        //   768: {
        //     slidesPerView: 2,
        //   },
        //   1024: {
        //     slidesPerView: 3,
        //   }
        // }}
      >
        {
          cards?.map((card, index) => {
            return (
              <swiper-slide key={index}>
                <ReviewCard card={card}></ReviewCard>
              </swiper-slide>
            )
          })
        }
      </swiper-container>
    </div >
  )
}

export default ReviewSlider