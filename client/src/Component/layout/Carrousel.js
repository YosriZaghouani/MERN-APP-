import React, {useState} from 'react';
import {Carousel, CarouselItem, CarouselControl, CarouselIndicators} from 'reactstrap';

const Carrousel = ({id, experience}) => {
  const items = [
    {
      src: experience.photo,
      altText: 'Slide 1',
      caption: 'Slide 1',
    },
    {
      src: experience.photo2,
      altText: 'Slide 2',
      caption: 'Slide 2',
    },
    {
      src: experience.photo3,
      altText: 'Slide 3',
      caption: 'Slide 3',
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = newIndex => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map(item => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img src={item.src} alt={item.altText} style={{width: '100%'}} />
      </CarouselItem>
    );
  });

  return (
    <Carousel activeIndex={activeIndex} style={{color: 'black'}} next={next} previous={previous}>
      <CarouselIndicators
        items={items}
        style={{color: 'black'}}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
      />
      {slides}
      <CarouselControl
        style={{color: 'black'}}
        direction="prev"
        directionText="Previous"
        onClickHandler={previous}
      />
      <CarouselControl
        style={{color: 'black'}}
        direction="next"
        directionText="Next"
        onClickHandler={next}
      />
    </Carousel>
  );
};

export default Carrousel;
