import React, { forwardRef, useEffect, useRef, useState } from "react";
import { getLatestUploads } from "../../api/movie";
import { useNotificaion } from "../../hooks";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import { Link } from "react-router-dom";

let count = 0;
let intervalId;

let newTime = 0;
let lastTime = 0;

export default function HeroSlideShow() {
  const [currentSlide, setCurrentSlide] = useState({});
  const [clonedSlide, setClonedSlide] = useState({});
  const [slides, setSlides] = useState([]);
  const [upNext, setUpNext] = useState([]);
  const [visible, setVisible] = useState(true);

  const slideRef = useRef();
  const clonedSlideRef = useRef();

  const { updateNotification } = useNotificaion();

  const fetchLatestUploads = async (signal) => {
    const { error, movies } = await getLatestUploads(signal);

    if (error) return updateNotification("error", error);

    setSlides([...movies]);
    setCurrentSlide(movies[0]);
  };

  const startSlideSlow = () => {
    intervalId = setInterval(() => {
      newTime = Date.now();
      const delta = newTime - lastTime;
      if (delta < 4000) return clearInterval(intervalId);
      handleOnNextClick();
    }, 3500);
  };

  const pauseSlideSlow = () => {
    clearInterval(intervalId);
  };

  const updateUpNext = (currentIndex) => {
    if (!slides.length) return;

    const upNextCount = currentIndex + 1;
    const end = upNextCount + 3;

    let newSlides = [...slides];
    newSlides = newSlides.slice(upNextCount, end);

    if (!newSlides.length) {
      newSlides = [...slides].slice(0, 3);
    }
    setUpNext([...newSlides]);
  };

  const handleOnNextClick = () => {
    lastTime = Date.now();
    pauseSlideSlow();
    setClonedSlide(slides[count]);
    count = (count + 1) % slides.length;
    setCurrentSlide(slides[count]);

    clonedSlideRef.current.classList.add("slide-out-to-left");
    slideRef.current.classList.add("slide-in-from-right");
    updateUpNext(count);
  };

  const handleOnPrevClick = () => {
    pauseSlideSlow();
    setClonedSlide(slides[count]);
    count = (count + slides.length - 1) % slides.length;
    setCurrentSlide(slides[count]);

    clonedSlideRef.current.classList.add("slide-out-to-right");
    slideRef.current.classList.add("slide-in-from-left");
    updateUpNext(count);
  };

  const handleAnimationEnd = () => {
    const classes = [
      "slide-in-from-left",
      "slide-in-from-right",
      "slide-out-to-left",
      "slide-out-to-right",
    ];
    slideRef.current.classList.remove(...classes);
    clonedSlideRef.current.classList.remove(...classes);
    setClonedSlide({});
    startSlideSlow();
  };

  const handleOnVisibilityChange = () => {
    const visibility = document.visibilityState;

    if (visibility === "hidden") setVisible(false);
    if (visibility === "visible") setVisible(true);
  };

  useEffect(() => {
    const ac = new AbortController();
    fetchLatestUploads(ac.signal);
    document.addEventListener("visibilitychange", handleOnVisibilityChange);
    return () => {
      pauseSlideSlow();
      document.removeEventListener(
        "visibilitychange",
        handleOnVisibilityChange
      );
      ac.abort();
    };
  }, []);

  useEffect(() => {
    if (slides.length && visible) {
      startSlideSlow();
      updateUpNext(count);
    } else pauseSlideSlow();
  }, [slides.length, visible]);

  return (
    <div className="flex w-full">
      <div className="relative w-full overflow-hidden md:w-4/5 aspect-video ">
        <Slide
          ref={slideRef}
          title={currentSlide.title}
          src={currentSlide.poster}
          id={currentSlide.id}
        />
        {/* Cloned Slide */}
        <Slide
          ref={clonedSlideRef}
          onAnimationEnd={handleAnimationEnd}
          className="absolute inset-0"
          src={clonedSlide.poster}
          title={clonedSlide.title}
          id={currentSlide.id}
        />
        <SlideShowContainer
          onNextClick={handleOnNextClick}
          onPrevClick={handleOnPrevClick}
        />
      </div>

      <div className="hidden w-1/5 px-3 space-y-3 md:block">
        <h1 className="text-2xl font-semibold text-primary dark:text-white">
          Up Next
        </h1>
        {upNext.map(({ poster, id }) => {
          return (
            <img
              key={id}
              src={poster}
              alt=""
              className="object-cover rounded aspect-video"
            />
          );
        })}
      </div>
    </div>
  );
}

const SlideShowContainer = ({ onPrevClick, onNextClick }) => {
  const btnClass =
    "p-2 text-xl text-white border-2 rounded outline-none bg-primary";
  return (
    <div className="absolute flex items-center justify-between w-full px-2 -translate-y-1/2 top-1/2">
      <button onClick={onPrevClick} className={btnClass} type="button">
        <AiOutlineDoubleLeft />
      </button>
      <button onClick={onNextClick} type="button" className={btnClass}>
        <AiOutlineDoubleRight />
      </button>
    </div>
  );
};

const Slide = forwardRef((props, ref) => {
  const { id, title, src, className = "", ...rest } = props;
  return (
    <Link
      to={"/movie/" + id}
      ref={ref}
      className={"w-full cursor-pointer block " + className}
      {...rest}
    >
      {src ? (
        <img className="object-cover aspect-video" src={src} alt="" />
      ) : null}
      {title ? (
        <div className="absolute inset-0 flex flex-col justify-end py-3 bg-gradient-to-t via-transparent dark:via-transparent from-white dark:from-primary">
          <h1 className="text-4xl font-semibold dark:text-highlight-dark text-highlight">
            {title}
          </h1>
        </div>
      ) : null}
    </Link>
  );
});
