document.addEventListener("DOMContentLoaded", function () {
  let icons = document.querySelectorAll(".how_play_toggler");
  let how_play = document.querySelector(".how_play");
  let overlay = document.querySelector(".overlay");

  icons.forEach(function (icon) {
    icon.addEventListener("click", function (event) {
      overlay.style.display = "block";
      how_play.style.display = "block";
    });
  });

  overlay.addEventListener("click", function () {
    how_play.style.display = "none";
    overlay.style.display = "none";
  });
  document.querySelector(".close-btn").addEventListener("click", function () {
    how_play.style.display = "none";
    overlay.style.display = "none";
  });
});

$(".dropdown-toggler").each(function () {
  var $dropDownToggle = $(this);
  var $dropDown = $dropDownToggle.find(".dropdown");

  $dropDownToggle.on("click", function (event) {
    event.stopPropagation();
    $dropDown.toggleClass("active");

    $(".dropdown-toggler").each(function () {
      if ($(this)[0] !== $dropDownToggle[0]) {
        $(this).find(".dropdown").removeClass("active");
      }
    });
  });

  $dropDown.on("click", function (event) {
    event.stopPropagation();
  });
});
$(document).ready(function () {
  var carouselslider = new Swiper(".carousel-slider", {
    spaceBetween: 0,
    slidesPerView: 3,
    centeredSlides: true,
    autoplay: {
      delay: 9500,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      type: "progressbar",
    },
    loop: true,
    breakpoints: {
      1024: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 1,
      },
      640: {
        slidesPerView: 1,
      },
      320: {
        slidesPerView: 1,
      },
    },
    on: {
      init: function () {
        const originalSlides = document.querySelectorAll(
          ".swiper-slide:not(.swiper-slide-duplicate)"
        ).length;
        document.querySelector(".total-slides").textContent = originalSlides
          .toString()
          .padStart(2, "0");
      },
    },
  });
  carouselslider.on("slideChange", function () {
    const realIndex = carouselslider.realIndex + 1;
    document.querySelector(".current-slide").textContent = realIndex
      .toString()
      .padStart(2, "0");
  });
});

document.querySelectorAll(".onboarding-card__arrow").forEach(function (arrow) {
  var target = document.querySelector(arrow.dataset.target);
  arrow.addEventListener(
    "click",
    function (e) {
      document.querySelector(".visible-card").classList.remove("visible-card");
      target.classList.add("visible-card");
    },
    false
  );
});

$(document).ready(() => {
  const $cardArrow = $('.onboarding-card__arrow[data-target="#card_4"]');

  const botImages = [
    "https://img.freepik.com/premium-vector/support-bot-ai-assistant-flat-icon-with-blue-support-bot-white-background_194782-1419.jpg",
    "https://img.freepik.com/free-vector/cartoon-style-robot-vectorart_78370-4103.jpg",
    "https://img.freepik.com/free-vector/ai-technology-robot-cyborg-illustrations_24640-134419.jpg",
    "https://img.freepik.com/premium-vector/mascot-robot-pack_844941-9.jpg",
    "https://img.freepik.com/free-photo/stylish-robot-pointing_1048-3528.jpg",
    "https://img.freepik.com/free-vector/robot-ai-technology-automation-icon_24877-83673.jpg",
    "https://img.freepik.com/premium-psd/artificial-intelligence-robot-automatic-3d-icon_465216-403.jpg",
  ];

  const botNames = [
    "Support Bot",
    "Cartoon Bot",
    "Cyborg AI",
    "Mascot Bot",
    "Stylish Bot",
    "Automation AI",
    "3D Robot",
  ];

  $cardArrow.on("click", (e) => {
    const $card4 = $("#card_4");
    const $userModes = $card4.find(".user_mode");
    $userModes
      .addClass("skeleton-loading")
      .find(".img")
      .empty()
      .append($("<div>").addClass("skeleton-img"))
      .end()
      .find(".name p")
      .empty()
      .addClass("skeleton-text")
      .end()
      .find(".current_player")
      .hide();

    const userImage =
      $("#card_3 .uploaded-image").attr("src") || "./assets/media/file.png";
    const userName = $("#card_3 #fullName").val()?.trim() || "Player 1";
    $userModes.each((index, element) => {
      const $player = $(element);
      const delay = index * 800;

      setTimeout(() => {
        if (index === 0) {
          $player
            .find(".img")
            .html(
              $("<img>", {
                src: userImage,
                alt: userName,
                class: "loaded-avatar",
              })
            )
            .end()
            .find(".name p")
            .text(userName);
        } else {
          const botIndex = (index - 1) % botImages.length;
          const botImage = botImages[botIndex];
          const botName = botNames[botIndex];

          $player
            .find(".img")
            .html(
              $("<img>", {
                src: botImage,
                alt: botName,
                class: "bot-avatar",
                onerror:
                  "this.src='https://img.freepik.com/free-vector/robot-ai-technology-automation-icon_24877-83673.jpg'",
              })
            )
            .end()
            .find(".name p")
            .text(botName);
        }
        $player
          .removeClass("skeleton-loading")
          .find(".current_player")
          .fadeIn(300)
          .end()
          .find(".name p")
          .removeClass("skeleton-text");
      }, delay);
    });
  });
});

$(document).ready(function () {
  $(".modes_list").on("click", ".mode", function () {
    $(".mode").removeClass("active");
    $(this).addClass("active");
    return false;
  });
});

$(document).ready(function () {
  $(".img_con .img").on("click", function (e) {
    if ($(e.target).closest(".icon").length || $(e.target).is(".icon")) {
      $(this).find(".hidden-file-input").trigger("click");
    }
  });
  $(".hidden-file-input").on("change", function (e) {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.match("image.*")) {
        alert("Please select an image file");
        return;
      }
      const reader = new FileReader();
      reader.onload = function (event) {
        $(".img_con .img img").attr("src", event.target.result);
        $(".user_mode .main_player img").attr("src", event.target.result);
        $(".img_con .img").addClass("has-image");
        $(".user_mode .main_player").addClass("has-image");
        showAlert("Congrats! Profile Successfully updated.", "success", 2000);
      };
      reader.onerror = function () {
        alert("Error reading the file");
      };
      reader.readAsDataURL(file);
    }
  });
  $(".hidden-file-input").on("click", function (e) {
    e.stopPropagation();
  });
});

$(document).ready(function () {
  $(".welcome").removeClass("hidden");
  $(".game_onboarding, .game_ground").addClass("hidden");
  $(".open-game_onboarding").on("click", function () {
    $(".welcome").addClass("hidden");
    $(".game_onboarding").removeClass("hidden");
  });

  $(".main_play_toggler").on("click", function () {
    $(".welcome").addClass("hidden");
    $(".game_onboarding").addClass("hidden");
    $(".game_ground").removeClass("hidden").addClass("active");
  });
});

$(".main-signup-btn").on("click", function () {
  $(".overlay").addClass("active");
  $(".popup.signup").addClass("active");
});

$(".main-login-btn").on("click", function () {
  $(".overlay").addClass("active");
  $(".popup.signin").addClass("active");
});
$(".my_profile").on("click", function () {
  $(".overlay").addClass("active");
  $(".popup.profile").addClass("active");
});

$(document).ready(function () {
  function isValidEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase());
  }
  function isValidPassword(password) {
    return password.length >= 6;
  }

  function validateForm(form) {
    let isValid = true;

    form.find(".google-input").each(function () {
      const $input = $(this);
      const $errorIndicator = $input.siblings(".error-indicator");
      const $errorTooltip = $errorIndicator.find(".error-tooltip");
      const value = $input.val().trim();

      $errorIndicator.removeClass("active");
      $input.removeClass("invalid");
      if (value === "") {
        $errorIndicator.addClass("active");
        $input.addClass("invalid");
        $errorTooltip.text("This field is required");
        isValid = false;
        return;
      }
      if (
        $input.attr("type") === "email" ||
        $input.is("#email, #emailreg, #emailf")
      ) {
        if (!isValidEmail(value)) {
          $errorIndicator.addClass("active");
          $input.addClass("invalid");
          $errorTooltip.text("Please enter a valid email address");
          isValid = false;
        }
      }

      if (
        $input.attr("type") === "password" ||
        $input.is("#password, #passwordreg")
      ) {
        if (!isValidPassword(value)) {
          $errorIndicator.addClass("active");
          $input.addClass("invalid");
          $errorTooltip.text("Password must be at least 6 characters");
          isValid = false;
        }
      }
    });

    return isValid;
  }
  $(".signin .btn").on("click", function (e) {
    e.preventDefault();
    const $form = $(this).closest("form");

    if (validateForm($form)) {
      $form.submit();
    }
  });

  $(".signup .btn").on("click", function (e) {
    e.preventDefault();
    const $form = $(this).closest("form");

    if (validateForm($form)) {
      $form.submit();
    }
  });

  $(".reset .btn").on("click", function (e) {
    e.preventDefault();
    const $form = $(this).closest("form");

    if (validateForm($form)) {
      $form.submit();
    }
  });

  $(".google-input").on("input", function () {
    const $errorIndicator = $(this).siblings(".error-indicator");
    const $input = $(this);
    $errorIndicator.removeClass("active");
    $input.removeClass("invalid");
  });

  $(".overlay, .close-btn").on("click", function () {
    $(".popup").removeClass("active");
    $(".overlay").removeClass("active");
  });
  $('.popup a.ref_link[href^="#"]').on("click", function (e) {
    e.preventDefault();
    const target = $(this).attr("href").substring(1);
    $(".popup").removeClass("active");
    $("." + target).addClass("active");
    $(".overlay").addClass("active");
  });
});

$(document).ready(function () {
  var activeAlerts = [];
  var verticalSpacing = 15;
  var alertIcons = {
    danger:
      '<svg width="34px" height="34px" stroke-width="0.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#fff"><path d="M9.5 14.5L11.9926 12M11.9926 12L14.5 9.5M11.9926 12L9.5 9.5M11.9926 12L14.5 14.5" stroke="#fff" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.8214 2.48697 15.5291 3.33782 17L2.5 21.5L7 20.6622C8.47087 21.513 10.1786 22 12 22Z" stroke="#fff" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
    success:
      '<svg width="34px" height="34px" stroke-width="0.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#fff"><path d="M7 12.5L10 15.5L17 8.5" stroke="#fff" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#fff" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
    info: '<svg width="34px" height="34px" stroke-width="0.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#fff"><path d="M12 11.5V16.5" stroke="#fff" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 7.51L12.01 7.49889" stroke="#fff" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#fff" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
    warning:
      '<svg width="34px" height="34px" stroke-width="0.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#fff"><path d="M12 7L12 13" stroke="#fff" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 17.01L12.01 16.9989" stroke="#fff" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#fff" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
  };

  function calculateTopPosition() {
    if (activeAlerts.length === 0) {
      return 15;
    }
    var lastAlert = activeAlerts[activeAlerts.length - 1];
    var lastAlertHeight = lastAlert.outerHeight(true);
    var lastAlertTop = parseInt(lastAlert.css("top"));
    return lastAlertTop + lastAlertHeight + verticalSpacing;
  }

  function updateAlertPositions(removedAlert) {
    var removedIndex = activeAlerts.indexOf(removedAlert);
    if (removedIndex === -1) return;
    activeAlerts.splice(removedIndex, 1);
    for (var i = removedIndex; i < activeAlerts.length; i++) {
      var $alert = activeAlerts[i];
      var newTop =
        i === 0
          ? 15
          : parseInt(activeAlerts[i - 1].css("top")) +
            activeAlerts[i - 1].outerHeight(true) +
            verticalSpacing;

      $alert.animate(
        {
          top: newTop,
        },
        300
      );
    }
  }

  window.showAlert = function (message, type, duration = 3000) {
    var $alert = $(
      '<div class="alert flex space_between ' +
        type +
        '">' +
        '<div class="flex">' +
        '<div class="icon-container">' +
        alertIcons[type] +
        "</div>" +
        '<div class="message">' +
        "<p>" +
        message +
        "</p>" +
        "</div>" +
        "</div>" +
        '<div class="icon flex justify_center close-btn">' +
        '<i class="ri-close-line"></i>' +
        "</div>" +
        "</div>"
    );

    var topPosition = calculateTopPosition();
    $alert.css({
      position: "absolute",
      top: topPosition + "px",
      right: "-400px",
      opacity: 0,
      "max-width": "350px",
    });

    $("body").append($alert);
    activeAlerts.push($alert);
    $alert.animate(
      {
        right: "15px",
        opacity: 1,
      },
      500,
      "swing"
    );
    var dismissTimer = setTimeout(function () {
      dismissAlert($alert);
    }, duration);
    $alert.find(".close-btn").click(function () {
      clearTimeout(dismissTimer);
      dismissAlert($alert);
    });
  };

  function dismissAlert($alert) {
    $alert.animate(
      {
        right: "-400px",
        opacity: 0,
      },
      500,
      "swing",
      function () {
        $alert.remove();
        updateAlertPositions($alert);
      }
    );
  }

  var alerts = [
    {
      message: "Success! Your action was completed successfully.",
      type: "success",
      duration: 3000,
    },
    {
      message: "Warning: This action cannot be undone.",
      type: "warning",
      duration: 4000,
    },
    {
      message: "Info: Your session will expire in 5 minutes.",
      type: "info",
      duration: 5000,
    },
    {
      message: "Error! Something went wrong with your request.",
      type: "danger",
      duration: 3500,
    },
  ];

  function showAlertsSequentially(index) {
    if (index < alerts.length) {
      showAlert(
        alerts[index].message,
        alerts[index].type,
        alerts[index].duration
      );

      setTimeout(function () {
        showAlertsSequentially(index + 1);
      }, 500);
    }
  }
});

$(document).ready(function () {
  $('.controls input[type="checkbox"]').on("change", function () {
    var switchId = $(this).attr("id");
    var switchLabel = $(this)
      .closest(".switch-holder")
      .find(".switch-label span")
      .text();

    if ($(this).is(":checked")) {
      showAlert(
        "Congrats! Game " + switchLabel + " turned on.",
        "success",
        2000
      );
    } else {
      showAlert(
        "Oh snap! Game " + switchLabel + " turned off.",
        "warning",
        2000
      );
    }
  });
});

$(document).ready(function () {
  $(".tab_links").on("click", ".tab_link", function (e) {
    e.preventDefault();
    $(".tab_link").removeClass("active");
    $(this).addClass("active");
    const tabText = $(this).text().trim();
    let targetClass = "";
    switch (tabText) {
      case "My Profile":
        targetClass = "my_profile";
        break;
      case "Password Management":
        targetClass = "passwords_management";
        break;
      case "Social Links":
        targetClass = "social_links";
        break;
      case "Settings":
        targetClass = "profile_settings";
        break;
      case "Game Timeline":
        targetClass = "game_timeline";
        break;
      default:
        targetClass = tabText.toLowerCase().replace(/\s+/g, "_");
    }
    $(".content").removeClass("active");
    $(".content." + targetClass).addClass("active");
  });

  $(".tab_link.active").click();
});

$(document).ready(function () {
  $(".input_enabled").click(function () {
    $(this).toggleClass("active");
    $(this).closest(".flex.space_between").next("form").toggleClass("active");
  });
});

// $(document).ready(function () {
//   const monthNames = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];
//   const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

//   let currentCenterDate = new Date();
//   currentCenterDate.setHours(0, 0, 0, 0);

//   const today = new Date();
//   today.setHours(0, 0, 0, 0);

//   function formatDateForAttr(date) {
//     return date.toISOString().split("T")[0]; // Format: yyyy-mm-dd
//   }

//   function renderTimeline(centerDate) {
//     let daysHtml = "";

//     let leftDays = 3;
//     let rightDays = 3;

//     const daysAfterCenter = Math.floor(
//       (today - centerDate) / (1000 * 60 * 60 * 24)
//     );
//     if (daysAfterCenter < rightDays) {
//       rightDays = daysAfterCenter;
//       leftDays = 6 - rightDays;
//     }

//     // Left arrow
//     daysHtml += `
//       <div class="icon flex justify_center Prev_day">
//         <i class="ri-arrow-left-s-line"></i>
//       </div>
//     `;

//     // Generate days
//     for (let i = -leftDays; i <= rightDays; i++) {
//       const loopDate = new Date(centerDate);
//       loopDate.setDate(centerDate.getDate() + i);
//       loopDate.setHours(0, 0, 0, 0);

//       if (loopDate <= today) {
//         const isCenter = i === 0;
//         const dateAttr = formatDateForAttr(loopDate);

//         if (isCenter) {
//           daysHtml += `
//             <div class="item curr_day justify_center flex col-d" data-date="${dateAttr}">
//               <p>${weekdays[loopDate.getDay()]}</p>
//               <h1 class="active">${loopDate.getDate()}</h1>
//               <p class="curr_month_year">${
//                 monthNames[loopDate.getMonth()]
//               } ${loopDate.getFullYear()}</p>
//             </div>
//           `;
//         } else {
//           daysHtml += `
//             <div class="item" data-date="${dateAttr}">
//               <h1>${loopDate.getDate()}</h1>
//             </div>
//           `;
//         }
//       }
//     }

//     daysHtml += `
//       <div class="icon flex justify_center next_day">
//         <i class="ri-arrow-right-s-line"></i>
//       </div>
//     `;

//     $(".date_slider").html(daysHtml);

//     $(".Prev_day").on("click", () => {
//       const prevDate = new Date(currentCenterDate);
//       prevDate.setDate(currentCenterDate.getDate() - 1);
//       currentCenterDate = prevDate;
//       renderTimeline(currentCenterDate);
//     });

//     $(".next_day").on("click", () => {
//       const nextDate = new Date(currentCenterDate);
//       nextDate.setDate(currentCenterDate.getDate() + 1);
//       nextDate.setHours(0, 0, 0, 0);
//       if (nextDate <= today) {
//         currentCenterDate = nextDate;
//         renderTimeline(currentCenterDate);
//       }
//     });
//     gsap.from(".date_slider .item", {
//       y: 20,
//       opacity: 0,
//       duration: 0.5,
//       ease: "power3.out",
//       stagger: 0.08,
//     });

//     gsap.from(".date_slider .icon", {
//       scale: 0.8,
//       opacity: 0,
//       duration: 0.4,
//       ease: "back.out(1.7)",
//       delay: 0.2,
//     });

//     gsap.from(".date_slider .curr_day", {
//       scale: 0.95,
//       opacity: 0,
//       duration: 0.6,
//       ease: "elastic.out(1, 0.5)",
//     });
//   }

//   // Init on load
//   renderTimeline(currentCenterDate);
// });
