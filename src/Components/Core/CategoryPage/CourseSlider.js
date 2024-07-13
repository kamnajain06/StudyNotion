import { useRef, useEffect } from 'react';
import { register } from 'swiper/element/bundle';
import CourseCard from './CourseCard';

register();

const CourseSlider = ({ courses }) => {
  const swiperElRef = useRef(null);

  useEffect(() => {
    // listen for Swiper events using addEventListener
    console.log("Courses", courses);
    swiperElRef.current.addEventListener('swiperprogress', (e) => {
      const [swiper, progress] = e.detail;
      // console.log(progress);
    });

    swiperElRef.current.addEventListener('swiperslidechange', (e) => {
      // console.log('slide changed');
    });
  }, []);

  return (
    <swiper-container
      ref={swiperElRef}
      slides-per-view="3"
      navigation="true"
      pagination="true"
      loop="true"
      autoplay="true"
      speed="1000"
      space-between="0"
      centered-slides="true"
    >
      {
        courses.map((course, index) => {
          return (
            <swiper-slide key={index}>
              <div className='flex justify-center'>
                <CourseCard course={course}></CourseCard>
              </div>
            </swiper-slide>
          )
        })
      }
    </swiper-container>
  );
};

export default CourseSlider;