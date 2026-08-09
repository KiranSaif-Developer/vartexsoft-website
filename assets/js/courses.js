(function () {
  function initCourseFilter() {
    const pills = document.querySelectorAll(".vx-filter-pill");
    const rows = document.querySelectorAll(".vx-course-row");
    const emptyMsg = document.getElementById("vxCoursesEmpty");

    if (!pills.length || !rows.length) return;

    pills.forEach((pill) => {
      pill.addEventListener("click", () => {
        pills.forEach((p) => p.classList.remove("active"));
        pill.classList.add("active");

        const filter = pill.getAttribute("data-filter");
        let visibleCount = 0;

        rows.forEach((row) => {
          const match = filter === "all" || row.getAttribute("data-category") === filter;
          row.hidden = !match;
          if (match) visibleCount++;
        });

        if (emptyMsg) emptyMsg.hidden = visibleCount !== 0;
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCourseFilter);
  } else {
    initCourseFilter();
  }
})();