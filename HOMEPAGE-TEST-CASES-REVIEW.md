# Homepage Detailed Test Cases - Review Document

## Overview
This document lists all 86 comprehensive test cases for the homepage (index.html) that test every button, text visibility, newsletter functionality, and interactive elements.

## Test Coverage Summary

- **Header & Navigation**: 14 test cases
- **Hero Section**: 8 test cases
- **Stats Section**: 6 test cases
- **Why Mental Health Matters**: 5 test cases
- **Coping Techniques**: 7 test cases
- **Wellness Journey**: 5 test cases
- **Products Section**: 8 test cases
- **Blog Section**: 5 test cases
- **Newsletter Section**: 15 test cases (comprehensive)
- **Footer Section**: 7 test cases
- **Text Overlap & Visibility**: 3 test cases
- **Interactive Elements**: 3 test cases

**Total: 86 test cases**

---

## Detailed Test Cases

### Header and Navigation (14 tests)

1. **HP-001**: Logo is visible and contains correct text
2. **HP-002**: Logo image has alt text
3. **HP-003**: Logo is clickable and links to homepage
4. **HP-004**: All main navigation links are visible
5. **HP-005**: Home link is visible and has active class
6. **HP-006**: About link is visible and clickable
7. **HP-007**: Wellness dropdown is visible and hoverable
8. **HP-008**: Wellness dropdown shows menu on hover
9. **HP-009**: Wellness dropdown contains all 4 links
10. **HP-010**: Wellness dropdown links have correct text and hrefs
11. **HP-011**: Resources link is visible and clickable
12. **HP-012**: Contact link is visible and clickable
13. **HP-013**: Search button is visible
14. **HP-014**: Mobile menu toggle is visible on mobile viewport

### Hero Section (8 tests)

15. **HP-015**: Hero section is visible
16. **HP-016**: Hero title text is visible and readable
17. **HP-017**: Hero subtitle text is visible and readable
18. **HP-018**: "Explore Free Resources" button is visible with correct text
19. **HP-019**: "Explore Free Resources" button is clickable and navigates
20. **HP-020**: "Take 5-Minute Calm Break" button is visible with correct text
21. **HP-021**: "Take 5-Minute Calm Break" button navigates to breathing page
22. **HP-022**: Scroll indicator is visible

### Mental Health Stats Section (6 tests)

23. **HP-023**: Stats section is visible
24. **HP-024**: Stats section heading is visible and readable
25. **HP-025**: All 4 stat cards are visible
26. **HP-026**: First stat card displays correct information
27. **HP-027**: Stat numbers are visible and not overlapping
28. **HP-028**: All stat labels are visible and readable

### Why Mental Health Matters Section (5 tests)

29. **HP-029**: Section is visible
30. **HP-030**: Section heading is visible and readable
31. **HP-031**: Content paragraphs are visible and readable
32. **HP-032**: "Learn More About Mental Health" button is visible with correct text
33. **HP-033**: "Learn More About Mental Health" button navigates correctly

### Coping Techniques Section (7 tests)

34. **HP-034**: Section is visible
35. **HP-035**: Section heading is visible
36. **HP-036**: All 4 technique cards are visible
37. **HP-037**: Meditation card has all elements visible
38. **HP-038**: All technique card buttons have visible text
39. **HP-039**: Technique card buttons navigate to correct pages
40. **HP-040**: Technique benefits lists are visible and readable

### Wellness Journey Section (5 tests)

41. **HP-041**: Section is visible
42. **HP-042**: Section heading is visible
43. **HP-043**: All 5 journey steps are visible
44. **HP-044**: Journey step numbers are visible
45. **HP-045**: Journey step titles and descriptions are readable

### Wellness Products Section (8 tests)

46. **HP-046**: Section is visible
47. **HP-047**: Section heading and subtitle are visible
48. **HP-048**: All 4 product cards are visible
49. **HP-049**: Product cards display all required information
50. **HP-050**: "View on Amazon" buttons are visible with correct text
51. **HP-051**: "View on Amazon" buttons open in new tab
52. **HP-052**: "See All Wellness Products" button is visible with correct text
53. **HP-053**: "See All Wellness Products" button navigates correctly

### Blog/Resources Section (5 tests)

54. **HP-054**: Section is visible
55. **HP-055**: Section heading is visible
56. **HP-056**: All 3 blog cards are visible
57. **HP-057**: Blog cards display all required information
58. **HP-058**: "Read More" buttons are visible with correct text

### Newsletter Section - Comprehensive (15 tests)

59. **HP-059**: Newsletter section is visible
60. **HP-060**: Newsletter heading is visible and readable
61. **HP-061**: Newsletter description is visible and readable
62. **HP-062**: Newsletter email input field is visible
63. **HP-063**: Newsletter email input has correct placeholder
64. **HP-064**: Newsletter email input is required
65. **HP-065**: Newsletter subscribe button is visible with correct text
66. **HP-066**: Newsletter form shows error for empty email submission
67. **HP-067**: Newsletter form shows error for invalid email format
68. **HP-068**: Newsletter form accepts valid email format
69. **HP-069**: Newsletter form shows success message for valid email
70. **HP-070**: Newsletter form shows error message for invalid email
71. **HP-071**: Newsletter form resets after successful submission
72. **HP-072**: Newsletter privacy policy link is visible and clickable
73. **HP-073**: Newsletter privacy text is visible and readable

### Footer Section (7 tests)

74. **HP-074**: Footer is visible
75. **HP-075**: All footer sections are visible
76. **HP-076**: Footer "About" section is visible with content
77. **HP-077**: Footer "Quick Links" section has all links
78. **HP-078**: Footer social media icons are visible and clickable
79. **HP-079**: Footer copyright text is visible
80. **HP-080**: Footer disclaimer is visible and readable

### Text Overlap and Visibility (3 tests)

81. **HP-081**: No text overlaps in hero section
82. **HP-082**: Button text is fully visible and not cut off
83. **HP-083**: All headings are visible and not overlapping

### Interactive Elements (3 tests)

84. **HP-084**: All buttons are clickable
85. **HP-085**: All links are clickable and have href
86. **HP-086**: External links have proper attributes

---

## Test Features

### Newsletter Testing (Comprehensive)
- ✅ Empty email validation
- ✅ Invalid email format validation
- ✅ Valid email format acceptance
- ✅ Success message display
- ✅ Error message display
- ✅ Form reset after submission
- ✅ Privacy policy link
- ✅ Input placeholder text
- ✅ Required field validation

### Button Testing
- ✅ Text visibility (not cut off)
- ✅ Text content verification
- ✅ Clickability
- ✅ Navigation correctness
- ✅ External link attributes (target="_blank", rel="noopener")

### Text Visibility Testing
- ✅ No text overlaps
- ✅ All headings readable
- ✅ Button text fully visible
- ✅ Content paragraphs readable
- ✅ Font size verification

### Interactive Element Testing
- ✅ All buttons clickable
- ✅ All links functional
- ✅ External links properly configured
- ✅ Dropdown menus functional

---

## Test File Location

**File**: `tests/homepage-detailed.spec.js`

## Running the Tests

To run only the homepage detailed tests:
```bash
npx playwright test tests/homepage-detailed.spec.js
```

To run with UI mode (interactive):
```bash
npx playwright test tests/homepage-detailed.spec.js --ui
```

To run in headed mode (see browser):
```bash
npx playwright test tests/homepage-detailed.spec.js --headed
```

---

## Review Checklist

Before running these tests, please review:

- [ ] All test cases cover the functionality you want tested
- [ ] Newsletter validation tests match your expected behavior
- [ ] Button text expectations are correct
- [ ] Navigation links point to correct pages
- [ ] Any additional test cases you'd like to add

---

## Next Steps

1. **Review** this document and the test file
2. **Approve** or request modifications
3. **Run** the tests to verify homepage functionality
4. **Add** these tests to the main test suite after approval

---

## Notes

- Tests use `http://127.0.0.1:8000/index.html` as base URL
- Tests wait for `networkidle` to ensure all content is loaded
- Newsletter tests check both HTML5 validation and JavaScript notifications
- Text overlap tests verify bounding boxes don't intersect
- All external links are verified to have proper security attributes

---

**Ready for Review!** 🚀

Please review the test cases above and let me know if you'd like any modifications before we run them.

