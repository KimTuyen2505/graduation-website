// Smooth scrolling animation
document.addEventListener("DOMContentLoaded", () => {
  // Add entrance animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe achievement cards
  const achievementCards = document.querySelectorAll(".achievement-card")
  achievementCards.forEach((card) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(30px)"
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(card)
  })

  // Add floating animation to design elements
  const designElements = document.querySelectorAll(".element")
  designElements.forEach((element, index) => {
    element.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-15px) scale(1.05)"
    })

    element.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })

  // Add click animation to color palette
  const colors = document.querySelectorAll(".color")
  colors.forEach((color) => {
    color.addEventListener("click", function () {
      this.style.transform = "scale(1.2)"
      setTimeout(() => {
        this.style.transform = "scale(1)"
      }, 200)
    })
  })

  // Parallax effect for floating shapes
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const shapes = document.querySelectorAll(".shape")

    shapes.forEach((shape, index) => {
      const speed = 0.5 + index * 0.1
      shape.style.transform = `translateY(${scrolled * speed}px)`
    })
  })

  // Add typing effect to graduate name
  const graduateName = document.querySelector(".graduate-name")
  const originalText = graduateName.textContent
  graduateName.textContent = ""

  let i = 0
  const typeWriter = () => {
    if (i < originalText.length) {
      graduateName.textContent += originalText.charAt(i)
      i++
      setTimeout(typeWriter, 100)
    }
  }

  setTimeout(typeWriter, 1000)

  // Initialize particle system
  new ParticleSystem()

  // Add enhanced animations
  enhancedScrollAnimations()
  add3DTiltEffect()
})

// Celebration modal functions
function showCelebration() {
  const modal = document.getElementById("celebrationModal")
  modal.style.display = "block"

  // Add confetti effect
  createConfetti()

  // Auto close after 5 seconds
  setTimeout(() => {
    hideCelebration()
  }, 5000)
}

function hideCelebration() {
  const modal = document.getElementById("celebrationModal")
  modal.style.display = "none"
}

// Create confetti effect
function createConfetti() {
  const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#FFD700"]
  const confettiContainer = document.querySelector(".confetti")

  // Clear existing confetti
  confettiContainer.innerHTML = ""

  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement("div")
    confetti.style.position = "absolute"
    confetti.style.width = "10px"
    confetti.style.height = "10px"
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
    confetti.style.left = Math.random() * 100 + "%"
    confetti.style.top = "-10px"
    confetti.style.borderRadius = "50%"
    confetti.style.animation = `confettiFall ${2 + Math.random() * 3}s linear forwards`
    confetti.style.animationDelay = Math.random() * 2 + "s"

    confettiContainer.appendChild(confetti)
  }
}

// Add confetti animation CSS
const style = document.createElement("style")
style.textContent = `
    .confetti {
        position: relative;
        width: 100%;
        height: 200px;
        overflow: hidden;
    }
    
    @keyframes confettiFall {
        0% {
            transform: translateY(-10px) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(200px) rotate(360deg);
            opacity: 0;
        }
    }
`
document.head.appendChild(style)

// Close modal when clicking outside
window.onclick = (event) => {
  const modal = document.getElementById("celebrationModal")
  if (event.target === modal) {
    hideCelebration()
  }
}

// Add keyboard navigation
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    hideCelebration()
  }
  if (event.key === "Enter" || event.key === " ") {
    const modal = document.getElementById("celebrationModal")
    if (modal.style.display === "none" || !modal.style.display) {
      showCelebration()
    }
  }
})

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Performance optimization: Throttle scroll events
let ticking = false

function updateScrollEffects() {
  const scrolled = window.pageYOffset
  const shapes = document.querySelectorAll(".shape")

  shapes.forEach((shape, index) => {
    const speed = 0.5 + index * 0.1
    shape.style.transform = `translateY(${scrolled * speed}px)`
  })

  ticking = false
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(updateScrollEffects)
    ticking = true
  }
})

// Particle System
class ParticleSystem {
  constructor() {
    this.canvas = document.getElementById("particleCanvas")
    this.ctx = this.canvas.getContext("2d")
    this.particles = []
    this.particleCount = 100

    this.resize()
    this.init()
    this.animate()

    window.addEventListener("resize", () => this.resize())
  }

  resize() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }

  init() {
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        color: this.getRandomColor(),
      })
    }
  }

  getRandomColor() {
    const colors = [
      "rgba(255, 107, 107, ",
      "rgba(78, 205, 196, ",
      "rgba(69, 183, 209, ",
      "rgba(150, 206, 180, ",
      "rgba(255, 234, 167, ",
    ]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.particles.forEach((particle, index) => {
      // Update position
      particle.x += particle.vx
      particle.y += particle.vy

      // Wrap around edges
      if (particle.x < 0) particle.x = this.canvas.width
      if (particle.x > this.canvas.width) particle.x = 0
      if (particle.y < 0) particle.y = this.canvas.height
      if (particle.y > this.canvas.height) particle.y = 0

      // Draw particle
      this.ctx.beginPath()
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      this.ctx.fillStyle = particle.color + particle.opacity + ")"
      this.ctx.fill()

      // Draw connections
      this.particles.forEach((otherParticle, otherIndex) => {
        if (index !== otherIndex) {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            this.ctx.beginPath()
            this.ctx.moveTo(particle.x, particle.y)
            this.ctx.lineTo(otherParticle.x, otherParticle.y)
            this.ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 100)})`
            this.ctx.lineWidth = 0.5
            this.ctx.stroke()
          }
        }
      })
    })

    requestAnimationFrame(() => this.animate())
  }
}

// Enhanced scroll animations
function enhancedScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in")

        // Special animation for letter text
        if (entry.target.classList.contains("letter-text")) {
          const paragraphs = entry.target.querySelectorAll("p")
          paragraphs.forEach((p, index) => {
            setTimeout(() => {
              p.style.opacity = "1"
              p.style.transform = "translateY(0)"
            }, index * 200)
          })
        }
      }
    })
  }, observerOptions)

  // Observe all animated elements
  const animatedElements = document.querySelectorAll(".achievement-card, .letter-paper, .future-content")
  animatedElements.forEach((el) => observer.observe(el))
}

// 3D tilt effect for cards
function add3DTiltEffect() {
  const cards = document.querySelectorAll(".achievement-card, .graduate-info, .letter-paper")

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = (y - centerY) / 10
      const rotateY = (centerX - x) / 10

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`
    })

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)"
    })
  })
}
