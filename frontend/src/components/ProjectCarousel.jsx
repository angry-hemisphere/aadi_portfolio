import { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

export default function ProjectCarousel({ projects }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [active, setActive] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slides: { perView: 1.1, spacing: 16 },
    breakpoints: {
      "(min-width: 640px)": { slides: { perView: 1.6, spacing: 20 } },
      "(min-width: 1024px)": { slides: { perView: 2, spacing: 24 } }
    },
    slideChanged(slider) {
      const rel = slider.track.details.rel;
      setCurrentSlide(rel);
      setActive(rel);
    },
    created() {
      setLoaded(true);
    }
  });

  return (
    <div className="carousel">
      <div className="carousel-fade left" />
      <div className="carousel-fade right" />

      <div ref={sliderRef} className="keen-slider">
        {projects.map((project, index) => (
          <div
            className={`keen-slider__slide ${
              index === active ? "is-active" : ""
            }`}
            key={project.title}
          >
            <div
              className="card project"
              tabIndex={0}
              onFocus={() => setActive(index)}
            >
              <div className={`project-media tone-${project.mediaTone}`}>
                <span>{project.media}</span>
              </div>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <div className="chips">
                {project.stack.map((tech) => (
                  <span key={tech} className="chip">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {loaded && instanceRef.current && (
        <div className="carousel-controls">
          <button
            className="carousel-btn"
            onClick={() => instanceRef.current.prev()}
            aria-label="Previous"
            disabled={currentSlide === 0}
          >
            ‹
          </button>
          <button
            className="carousel-btn"
            onClick={() => instanceRef.current.next()}
            aria-label="Next"
            disabled={
              currentSlide ===
              instanceRef.current.track.details.slides.length - 1
            }
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
