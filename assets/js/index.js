// // 跳出 Line 內部瀏覽器
// ;(function () {
//   const url = new URL(window.location.href)
//   const params = url.searchParams

//   if (!params.has("openExternalBrowser")) {
//     // 加上參數
//     params.set("openExternalBrowser", "1")

//     window.location.replace(`${url.origin}${url.pathname}?${params.toString()}`)
//   }
// })()

window.addEventListener("load", () => {
  const circleCards = document.querySelectorAll(".circle-card")
  const squareCards = document.querySelectorAll(".square-card")
  const bgDecorate = document.querySelectorAll(".bg-decorate")
  const goToTop = document.getElementById("go-to-top")
  const quizPosition = document.querySelector("#quiz-position")
  const capture = document.querySelector("#capture")
  const formNextBtn = document.querySelector(".form-next-btn")
  const formPrevBtn = document.querySelector(".form-prev-btn")
  const brandLinkMiele = document.querySelector(".brand-link-miele")
  const brandLinkBertazzoni = document.querySelector(".brand-link-bertazzoni")
  const brandLinkWhirlpool = document.querySelector(".brand-link-whirlpool")
  const brandLinkKe = document.querySelector(".brand-link-ke")
  let productSize = {
    cabinet: ["76.5–82.5 cm", "80.5–87 cm", "82–87 cm"],
    single: [
      "76.5–82.5 cm",
      "77.5–82.5 cm",
      "82–85 cm",
      "82–87 cm",
      "82–91 cm",
    ],
  }
  let formData

  const brandSwiperInstance = new Swiper(".brand-swiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    // Responsive breakpoints
    breakpoints: {
      768: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 50,
      },
    },
    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  })
  // 顯示按鈕：當滾動超過 300px
  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      goToTop.classList.add("active")
    } else {
      goToTop.classList.remove("active")
    }
  })

  // 點擊按鈕：平滑捲回頂部
  goToTop.addEventListener("click", () => {
    quizPosition.scrollIntoView({ behavior: "smooth" })
  })

  // GSAP scroll-behavior: smooth 有 bug
  gsap.registerPlugin(ScrollTrigger)
  const mm = gsap.matchMedia()

  mm.add(
    {
      mobile: "(max-width: 768px)",
      desktop: "(min-width: 769px)",
    },
    (ctx) => {
      const { mobile } = ctx.conditions

      circleCards.forEach((el, index) => {
        gsap.to(el, {
          y: "0%",
          opacity: 1,
          duration: 0.5,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: el,
            // 用函式值，斷點切換/refresh 時會重新計算
            start: () => (mobile ? "top 50%" : `top ${50 - index * 5}%`),
            // toggleActions: "play none none reverse",
            // markers: true, // 除錯時開，正式環境記得關
            invalidateOnRefresh: true, // 尺寸變更時重新取 start
          },
        })
      })
      squareCards.forEach((el, index) => {
        gsap.to(el, {
          rotationY: 0,
          duration: 1,
          scrollTrigger: {
            trigger: el,
            // 用函式值，斷點切換/refresh 時會重新計算
            start: () => (mobile ? "top 50%" : `top ${40 - index * 5}%`),
            // toggleActions: "play none none reverse",
            // markers: true, // 除錯時開，正式環境記得關
            invalidateOnRefresh: true, // 尺寸變更時重新取 start
          },
        })
      })
    },
  )

  const topTitle = document.querySelector(".top-title")
  if (topTitle) {
    gsap.to(topTitle, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
    })
  }

  gsap.to(".dishwasher", {
    opacity: 1,
    y: 0,
    duration: 1,
    stagger: 0.5, // 每個間隔 0.3 秒進場
    ease: "power2.out",
  })

  bgDecorate.forEach((el, index) => {
    gsap.to(el, {
      y: "60%",
      opacity: 1,
      duration: 2,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: el,
        // 用函式值，斷點切換/refresh 時會重新計算
        start: "top 30%",
        scrub: 2,
        // markers: true, // 除錯時開，正式環境記得關
        invalidateOnRefresh: true, // 尺寸變更時重新取 start
      },
    })
  })

  // 擷取 #capture 區塊內的表單資料
  function getCaptureData() {
    const captureEl = document.querySelector("#capture")
    if (!captureEl) return null

    const data = {}

    for (let i = 1; i <= 4; i++) {
      const checkedRadio = captureEl.querySelector(
        `#q${i} input[type="radio"]:checked`,
      )
      let selection = ""
      if (checkedRadio) {
        const label = captureEl.querySelector(`label[for="${checkedRadio.id}"]`)
        if (label) {
          const textSpan = label.querySelector(".checkbox-text")
          selection = textSpan ? textSpan.textContent.trim() : ""
        }
      }
      data[`q${i}`] = selection
    }

    return data
  }

  const captureCheckbox = document.querySelectorAll("#capture .checkbox-group")
  captureCheckbox.forEach((group) => {
    group.addEventListener("change", () => {
      formData = getCaptureData()
      console.log("擷取到的問卷資料:", formData)
      formNextBtn.disabled = !isCurrentQuestionAnswered()
    })
  })

  // Quiz logic
  const questions = [
    document.getElementById("q1"),
    document.getElementById("q2"),
    document.getElementById("q3"),
    document.getElementById("q4"),
    document.getElementById("answer"),
  ]
  const totalQuestions = questions.length

  const quizDescription = document.getElementById("quiz-description")

  const option110v = document.querySelector(".option110v")
  const option220v = document.querySelector(".option220v")
  let currentQuestionIndex = 0 // 0-based index

  function isCurrentQuestionAnswered() {
    // q1, q2, q3, q4 的索引分別是 0, 1, 2, 3
    if (currentQuestionIndex >= 0 && currentQuestionIndex <= 3) {
      const questionKey = `q${currentQuestionIndex + 1}`
      // 如果 formData 存在且對應的 key 有值，代表問題已回答
      return !!(formData && formData[questionKey])
    }
    // 對於答案頁面（索引 4）或任何其他情況，視為有效
    return true
  }

  function updateQ2Options(optionsArray) {
    optionsArray.forEach((size, index) => {
      let str = `
        <li class="flex-shrink-0">
          <label class="checkbox-group" for="q2-${index + 1}">
            <input
              class="checkbox-input"
              id="q2-${index + 1}"
              name="q2"
              type="radio"
              ${formData?.q2 === size ? "checked" : ""}
            />
            <span class="checkbox-span"></span>
            <span class="checkbox-text">${size}</span>
          </label>
        </li>
      `
      document.querySelector("#q2 ul").insertAdjacentHTML("beforeend", str)
    })
    document.querySelectorAll("#q2 .checkbox-group").forEach((group) => {
      group.addEventListener("change", () => {
        formData = getCaptureData()
        console.log("擷取到的問卷資料:", formData)
        formNextBtn.disabled = !isCurrentQuestionAnswered()
      })
    })
  }

  function updateAnswer() {
    // 重置
    brandLinkMiele.style.display = "none"
    brandLinkBertazzoni.style.display = "none"
    brandLinkWhirlpool.style.display = "none"
    brandLinkKe.style.display = "none"
    // 第一組
    if (
      formData?.q1 === "廚下型（需嵌入櫥櫃，搭配廚房系列門板）" &&
      formData?.q2 === "80.5–87 cm" &&
      formData?.q3 === "有220V插座" &&
      (formData?.q4 === "6 萬以上" || formData?.q4 === "沒有預算限制")
    ) {
      brandLinkMiele.style.display = "flex"
      document.querySelector(".brand-link-miele p").innerHTML =
        `<span>G7964C-SCVi、</span><span>G7364C-SCVi、</span><span>G5264C-SCVi、</span><span>G7314C-SCi、</span><span>G7114C-SCi、</span><span>G7104C-SCi、</span><span>G5214C-SCi</span>`
    }
    // 第二組
    if (
      formData?.q1 === "廚下型（需嵌入櫥櫃，搭配廚房系列門板）" &&
      formData?.q2 === "82–87 cm" &&
      formData?.q3 === "有220V插座" &&
      (formData?.q4 === "4–6 萬" || formData?.q4 === "沒有預算限制")
    ) {
      brandLinkBertazzoni.style.display = "flex"
      document.querySelector(".brand-link-bertazzoni p").innerHTML =
        `<span>DW6O3SIDV-60</span>`
    }
    // 第三組
    if (
      formData?.q1 === "廚下型（需嵌入櫥櫃，搭配廚房系列門板）" &&
      formData?.q2 === "76.5–82.5 cm" &&
      formData?.q3 === "有110V插座" &&
      (formData?.q4 === "3–4 萬" || formData?.q4 === "沒有預算限制")
    ) {
      brandLinkKe.style.display = "flex"
      document.querySelector(".brand-link-ke p").innerHTML =
        `<span>KDW-756Si、</span><span>KDW-856i</span>`
    }
    // 第四組
    if (
      formData?.q1 === "獨立式（獨立擺放）" &&
      formData?.q2 === "82–91 cm" &&
      formData?.q3 === "有220V插座" &&
      (formData?.q4 === "6 萬以上" || formData?.q4 === "沒有預算限制")
    ) {
      brandLinkMiele.style.display = "flex"
      document.querySelector(".brand-link-miele p").innerHTML =
        `<span>G7101C-SC、</span><span>G5214C-SC、</span><span>G5001-SC</span>`
    }
    // 第五組
    if (
      formData?.q1 === "獨立式（獨立擺放）" &&
      formData?.q2 === "82–87 cm" &&
      formData?.q3 === "有220V插座" &&
      (formData?.q4 === "4–6 萬" || formData?.q4 === "沒有預算限制")
    ) {
      brandLinkBertazzoni.style.display = "flex"
      document.querySelector(".brand-link-bertazzoni p").innerHTML =
        `<span>DW6083FSBC-60</span>`
    }
    // 第六組
    if (
      formData?.q1 === "獨立式（獨立擺放）" &&
      formData?.q2 === "82–85 cm" &&
      formData?.q3 === "有220V插座" &&
      (formData?.q4 === "4–6 萬" || formData?.q4 === "沒有預算限制")
    ) {
      brandLinkWhirlpool.style.display = "flex"
      document.querySelector(".brand-link-whirlpool p").innerHTML =
        `<span>WFO3T123PLXD</span>`
    }
    // 第七組
    if (
      formData?.q1 === "獨立式（獨立擺放）" &&
      formData?.q2 === "77.5–82.5 cm" &&
      formData?.q3 === "有110V插座" &&
      (formData?.q4 === "3–4 萬" || formData?.q4 === "沒有預算限制")
    ) {
      brandLinkWhirlpool.style.display = "flex"
      document.querySelector(".brand-link-whirlpool p").innerHTML =
        `<span>WDFS3R5PIXTW</span>`
    }
    // 第八組
    if (
      formData?.q1 === "獨立式（獨立擺放）" &&
      formData?.q2 === "76.5–82.5 cm" &&
      formData?.q3 === "有110V插座" &&
      (formData?.q4 === "2–3 萬" || formData?.q4 === "沒有預算限制")
    ) {
      brandLinkKe.style.display = "flex"
      document.querySelector(".brand-link-ke p").innerHTML =
        `<span>KDW-656FW</span>`
    }
    // 第九組
    if (formData?.q1 === "桌上型（放檯面）") {
      brandLinkKe.style.display = "flex"
      document.querySelector(".brand-link-ke p").innerHTML =
        `<span>KDW-236W</span>`
    }
  }

  function updateFormView() {
    console.log("目前在第", currentQuestionIndex + 1, "題")

    // 隱藏所有問題，並顯示當前的問題
    questions.forEach((q, index) => {
      if (index === currentQuestionIndex) {
        q.classList.remove("hidden")
      } else {
        q.classList.add("hidden")
      }
    })

    // 更新按鈕的可見性和文字
    formPrevBtn.classList.toggle("hidden", currentQuestionIndex === 0)

    // 根據 q1 的答案，決定 q2 的選項
    if (formData?.q1 === "廚下型（需嵌入櫥櫃，搭配廚房系列門板）") {
      document.querySelector("#q2 ul").innerHTML = ""
      updateQ2Options(productSize.cabinet)
    } else {
      document.querySelector("#q2 ul").innerHTML = ""
      updateQ2Options(productSize.single)
    }

    // 根據 q2 的答案，決定電壓選項
    if (formData?.q2 === "76.5–82.5 cm" || formData?.q2 === "77.5–82.5 cm") {
      option110v.classList.remove("disabled")
      option220v.classList.add("disabled")
      // 避免切換選項時，錯誤的選項還是被選取
      option220v.querySelector("input").checked = false
    } else {
      option110v.classList.add("disabled")
      option220v.classList.remove("disabled")
      // 避免切換選項時，錯誤的選項還是被選取
      option110v.querySelector("input").checked = false
    }
    // 根據 q2 的答案，決定價格
    function resetQ4(className) {
      document.querySelectorAll("#q4 .checkbox-group").forEach((el) => {
        if (
          el.classList.contains(className) ||
          el.classList.contains("optionNoLimit")
        ) {
          el.classList.remove("disabled")
          return
        }
        el.classList.add("disabled")
        el.querySelector("input").checked = false
      })
    }
    // 2-3 萬以上選項
    if (
      formData?.q1 === "獨立式（獨立擺放）" &&
      formData?.q2 === "76.5–82.5 cm"
    ) {
      resetQ4("option2-3w")
    }
    // 3-4 萬以上選項
    if (
      (formData?.q1 === "廚下型（需嵌入櫥櫃，搭配廚房系列門板）" &&
        formData?.q2 === "76.5–82.5 cm") ||
      formData?.q2 === "77.5–82.5 cm"
    ) {
      resetQ4("option3-4w")
    }
    // 4-6 萬以上選項
    if (formData?.q2 === "82–87 cm" || formData?.q2 === "82–85 cm") {
      resetQ4("option4-6w")
    }
    // 6 萬以上選項
    if (formData?.q2 === "80.5–87 cm" || formData?.q2 === "82–91 cm") {
      resetQ4("option6wUp")
    }

    // 最後一題要做的事
    if (currentQuestionIndex === totalQuestions - 1) {
      formNextBtn.textContent = "問卷下載"
      quizDescription.classList.add("hidden")
      formNextBtn.disabled = false
      updateAnswer()
    } else {
      quizDescription.classList.remove("hidden")
      formNextBtn.textContent = "下一題"
      formNextBtn.disabled = !isCurrentQuestionAnswered()
    }
  }

  let tableTypeSwitch = false

  formNextBtn.addEventListener("click", async () => {
    formData = getCaptureData()
    console.log("擷取到的問卷資料:", formData)
    if (formData?.q1 === "桌上型（放檯面）" && tableTypeSwitch === false) {
      currentQuestionIndex = 3
      tableTypeSwitch = true
    }

    if (currentQuestionIndex < totalQuestions - 1) {
      currentQuestionIndex++
      updateFormView()
    } else {
      // 這是「下載」按鈕的操作
      formNextBtn.disabled = true
      formNextBtn.textContent = "問卷下載中..."

      // 暫時顯示所有問題以供截圖
      questions.forEach((q) => q.classList.remove("hidden"))
      const navButtonsContainer = capture.querySelector(
        '[data-capture="exclude"]',
      )
      if (navButtonsContainer) navButtonsContainer.style.display = "none"

      try {
        capture.querySelector("h3").textContent = "問卷結果"
        const result = await snapdom(capture, { scale: 2 })
        await result.download({ format: "png", filename: "問卷結果" })
      } catch (error) {
        console.error("Oops, something went wrong!", error)
        alert("圖片截圖失敗，請稍後再試。")
      } finally {
        // 還原畫面
        if (navButtonsContainer) navButtonsContainer.style.display = ""
        updateFormView()
        formNextBtn.disabled = false
        formNextBtn.textContent = "問卷下載"
        capture.querySelector("h3").textContent = "品牌推薦與問卷下載"
      }
    }
  })

  formPrevBtn.addEventListener("click", () => {
    if (formData?.q1 === "桌上型（放檯面）") {
      currentQuestionIndex = 0
      updateFormView()
      tableTypeSwitch = false
      return
    }
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--
      updateFormView()
    }
  })

  // 初始化表單畫面
  updateFormView()
  formNextBtn.disabled = !isCurrentQuestionAnswered()

  const resizeHandle = () => {
    ScrollTrigger.update()
  }

  resizeHandle()
  window.addEventListener("resize", resizeHandle)
})
