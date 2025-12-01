const callbackVector = (entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const lazyImage = entry.target
            lazyImage.classList.add("active");
        }
    })
}

const options = {
  rootMargin: '600px 0px 0px 0px',
  threshold: 0
}

const observer = new IntersectionObserver(callbackVector, options);
const vectorImages = document.querySelectorAll(".print-illustration");
vectorImages.forEach((image) => observer.observe(image))
