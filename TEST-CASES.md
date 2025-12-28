# TranquilMindQuest - Comprehensive UI Test Cases

## Overview
This document lists all possible UI test cases for the TranquilMindQuest website. These tests ensure functionality, accessibility, responsiveness, and user experience across all pages and features.

---

## 1. Navigation & Header Tests

### 1.1 Desktop Navigation
- [ ] **TC-001**: Verify logo is visible and clickable
- [ ] **TC-002**: Verify logo links to homepage (index.html)
- [ ] **TC-003**: Verify all navigation links are visible (Home, About, Wellness, Resources, Contact)
- [ ] **TC-004**: Verify "Wellness" dropdown menu appears on hover
- [ ] **TC-005**: Verify dropdown menu contains correct links (Meditation, Breathing, Yoga, Mindfulness)
- [ ] **TC-006**: Verify dropdown links navigate to correct pages
- [ ] **TC-007**: Verify active page is highlighted in navigation
- [ ] **TC-008**: Verify search button is visible and clickable
- [ ] **TC-009**: Verify header has correct background color and styling
- [ ] **TC-010**: Verify header becomes sticky/transparent on scroll

### 1.2 Mobile Navigation
- [ ] **TC-011**: Verify hamburger menu button is visible on mobile (< 768px)
- [ ] **TC-012**: Verify hamburger menu opens when clicked
- [ ] **TC-013**: Verify mobile menu displays all navigation links
- [ ] **TC-014**: Verify mobile menu closes when clicking outside
- [ ] **TC-015**: Verify mobile menu closes when clicking a link
- [ ] **TC-016**: Verify mobile menu closes on Escape key press
- [ ] **TC-017**: Verify body scroll is disabled when mobile menu is open
- [ ] **TC-018**: Verify hamburger icon transforms to X when menu is open
- [ ] **TC-019**: Verify mobile menu overlay appears correctly
- [ ] **TC-020**: Verify dropdown menu works on mobile (if applicable)

### 1.3 Skip Link (Accessibility)
- [ ] **TC-021**: Verify skip link is visible on keyboard focus
- [ ] **TC-022**: Verify skip link navigates to main content
- [ ] **TC-023**: Verify skip link is hidden visually but accessible to screen readers

---

## 2. Homepage (index.html) Tests

### 2.1 Hero Section
- [ ] **TC-024**: Verify hero section is visible and properly styled
- [ ] **TC-025**: Verify hero title text is displayed correctly
- [ ] **TC-026**: Verify hero subtitle text is displayed correctly
- [ ] **TC-027**: Verify "Explore Free Resources" button is visible and clickable
- [ ] **TC-028**: Verify "Take 5-Minute Calm Break" button is visible and clickable
- [ ] **TC-029**: Verify breathing circle animation is present
- [ ] **TC-030**: Verify particles animation is present
- [ ] **TC-031**: Verify scroll indicator is visible
- [ ] **TC-032**: Verify scroll indicator disappears after scrolling down
- [ ] **TC-033**: Verify CTA buttons navigate to correct sections/pages

### 2.2 Mental Health Stats Section
- [ ] **TC-034**: Verify stats section title is displayed
- [ ] **TC-035**: Verify all 4 stat cards are visible
- [ ] **TC-036**: Verify stat numbers animate on scroll (count-up animation)
- [ ] **TC-037**: Verify stat labels are displayed correctly
- [ ] **TC-038**: Verify stat descriptions are displayed correctly
- [ ] **TC-039**: Verify stat sources are displayed correctly

### 2.3 Why Mental Health Matters Section
- [ ] **TC-040**: Verify section title is displayed
- [ ] **TC-041**: Verify content text is readable
- [ ] **TC-042**: Verify "Learn More About Mental Health" button is clickable
- [ ] **TC-043**: Verify button navigates to about.html
- [ ] **TC-044**: Verify illustration/placeholder is visible

### 2.4 Coping Techniques Section
- [ ] **TC-045**: Verify section title is displayed
- [ ] **TC-046**: Verify all 4 technique cards are visible
- [ ] **TC-047**: Verify each card has correct icon, title, description, and benefits
- [ ] **TC-048**: Verify "Start Meditating" button navigates to meditation.html
- [ ] **TC-049**: Verify "Explore Yoga Poses" button navigates to yoga.html
- [ ] **TC-050**: Verify "Try Breathing Exercises" button navigates to breathing.html
- [ ] **TC-051**: Verify "Practice Mindfulness" button navigates to mindfulness.html
- [ ] **TC-052**: Verify cards animate on scroll (fade-in-up)

### 2.5 Wellness Journey Section
- [ ] **TC-053**: Verify section title is displayed
- [ ] **TC-054**: Verify all 5 journey steps are visible
- [ ] **TC-055**: Verify step numbers are displayed correctly (1-5)
- [ ] **TC-056**: Verify step titles and descriptions are readable
- [ ] **TC-057**: Verify timeline layout is correct

### 2.6 Featured Products Section
- [ ] **TC-058**: Verify section title is displayed
- [ ] **TC-059**: Verify all product cards are visible
- [ ] **TC-060**: Verify product titles, prices, and ratings are displayed
- [ ] **TC-061**: Verify "View on Amazon" buttons are clickable
- [ ] **TC-062**: Verify Amazon links open in new tab with correct rel attributes
- [ ] **TC-063**: Verify "See All Wellness Products" button navigates to products.html
- [ ] **TC-064**: Verify product cards animate on scroll

### 2.7 Blog/Resources Section
- [ ] **TC-065**: Verify section title is displayed
- [ ] **TC-066**: Verify blog cards are visible
- [ ] **TC-067**: Verify blog post titles, dates, and excerpts are displayed
- [ ] **TC-068**: Verify "Read More" buttons are clickable
- [ ] **TC-069**: Verify blog links navigate to correct blog posts
- [ ] **TC-070**: Verify blog cards animate on scroll

### 2.8 Newsletter Signup
- [ ] **TC-071**: Verify newsletter section is visible
- [ ] **TC-072**: Verify email input field is present
- [ ] **TC-073**: Verify subscribe button is clickable
- [ ] **TC-074**: Verify form validation works (empty email shows error)
- [ ] **TC-075**: Verify invalid email format shows error
- [ ] **TC-076**: Verify valid email submission shows success message
- [ ] **TC-077**: Verify form resets after successful submission
- [ ] **TC-078**: Verify privacy policy link is present and clickable

### 2.9 Homepage Detailed Tests (HP-001 to HP-086)
**Comprehensive detailed tests covering every element on the homepage**

#### Header & Navigation (HP-001 to HP-014)
- [ ] **HP-001**: Logo is visible and contains correct text
- [ ] **HP-002**: Logo image has alt text
- [ ] **HP-003**: Logo is clickable and links to homepage
- [ ] **HP-004**: All main navigation links are visible
- [ ] **HP-005**: Home link is visible and has active class
- [ ] **HP-006**: About link is visible and clickable
- [ ] **HP-007**: Wellness dropdown is visible and hoverable
- [ ] **HP-008**: Wellness dropdown shows menu on hover
- [ ] **HP-009**: Wellness dropdown contains all 4 links
- [ ] **HP-010**: Wellness dropdown links have correct text and hrefs
- [ ] **HP-011**: Resources link is visible and clickable
- [ ] **HP-012**: Contact link is visible and clickable
- [ ] **HP-013**: Search button is visible
- [ ] **HP-014**: Mobile menu toggle is visible on mobile viewport

#### Hero Section (HP-015 to HP-022)
- [ ] **HP-015**: Hero section is visible
- [ ] **HP-016**: Hero title text is visible and readable
- [ ] **HP-017**: Hero subtitle text is visible and readable
- [ ] **HP-018**: "Explore Free Resources" button is visible with correct text
- [ ] **HP-019**: "Explore Free Resources" button is clickable and navigates
- [ ] **HP-020**: "Take 5-Minute Calm Break" button is visible with correct text
- [ ] **HP-021**: "Take 5-Minute Calm Break" button navigates to breathing page
- [ ] **HP-022**: Scroll indicator is visible

#### Stats Section (HP-023 to HP-028)
- [ ] **HP-023**: Stats section is visible
- [ ] **HP-024**: Stats section heading is visible and readable
- [ ] **HP-025**: All 4 stat cards are visible
- [ ] **HP-026**: First stat card displays correct information
- [ ] **HP-027**: Stat numbers are visible and not overlapping
- [ ] **HP-028**: All stat labels are visible and readable

#### Why Mental Health Matters (HP-029 to HP-033)
- [ ] **HP-029**: Section is visible
- [ ] **HP-030**: Section heading is visible and readable
- [ ] **HP-031**: Content paragraphs are visible and readable
- [ ] **HP-032**: "Learn More About Mental Health" button is visible with correct text
- [ ] **HP-033**: "Learn More About Mental Health" button navigates correctly

#### Coping Techniques (HP-034 to HP-040)
- [ ] **HP-034**: Section is visible
- [ ] **HP-035**: Section heading is visible
- [ ] **HP-036**: All 4 technique cards are visible
- [ ] **HP-037**: Meditation card has all elements visible
- [ ] **HP-038**: All technique card buttons have visible text
- [ ] **HP-039**: Technique card buttons navigate to correct pages
- [ ] **HP-040**: Technique benefits lists are visible and readable

#### Wellness Journey (HP-041 to HP-045)
- [ ] **HP-041**: Section is visible
- [ ] **HP-042**: Section heading is visible
- [ ] **HP-043**: All 5 journey steps are visible
- [ ] **HP-044**: Journey step numbers are visible
- [ ] **HP-045**: Journey step titles and descriptions are readable

#### Products Section (HP-046 to HP-053)
- [ ] **HP-046**: Section is visible
- [ ] **HP-047**: Section heading and subtitle are visible
- [ ] **HP-048**: All 4 product cards are visible
- [ ] **HP-049**: Product cards display all required information
- [ ] **HP-050**: "View on Amazon" buttons are visible with correct text
- [ ] **HP-051**: "View on Amazon" buttons open in new tab
- [ ] **HP-052**: "See All Wellness Products" button is visible with correct text
- [ ] **HP-053**: "See All Wellness Products" button navigates correctly

#### Blog Section (HP-054 to HP-058)
- [ ] **HP-054**: Section is visible
- [ ] **HP-055**: Section heading is visible
- [ ] **HP-056**: All 3 blog cards are visible
- [ ] **HP-057**: Blog cards display all required information
- [ ] **HP-058**: "Read More" buttons are visible with correct text

#### Newsletter Section - Comprehensive (HP-059 to HP-073)
- [ ] **HP-059**: Newsletter section is visible
- [ ] **HP-060**: Newsletter heading is visible and readable
- [ ] **HP-061**: Newsletter description is visible and readable
- [ ] **HP-062**: Newsletter email input field is visible
- [ ] **HP-063**: Newsletter email input has correct placeholder
- [ ] **HP-064**: Newsletter email input is required
- [ ] **HP-065**: Newsletter subscribe button is visible with correct text
- [ ] **HP-066**: Newsletter form shows error for empty email submission
- [ ] **HP-067**: Newsletter form shows error for invalid email format
- [ ] **HP-068**: Newsletter form accepts valid email format
- [ ] **HP-069**: Newsletter form shows success message for valid email
- [ ] **HP-070**: Newsletter form shows error message for invalid email
- [ ] **HP-071**: Newsletter form resets after successful submission
- [ ] **HP-072**: Newsletter privacy policy link is visible and clickable
- [ ] **HP-073**: Newsletter privacy text is visible and readable

#### Footer Section (HP-074 to HP-080)
- [ ] **HP-074**: Footer is visible
- [ ] **HP-075**: All footer sections are visible
- [ ] **HP-076**: Footer "About" section is visible with content
- [ ] **HP-077**: Footer "Quick Links" section has all links
- [ ] **HP-078**: Footer social media icons are visible and clickable
- [ ] **HP-079**: Footer copyright text is visible
- [ ] **HP-080**: Footer disclaimer is visible and readable

#### Text Overlap and Visibility (HP-081 to HP-083)
- [ ] **HP-081**: No text overlaps in hero section
- [ ] **HP-082**: Button text is fully visible and not cut off
- [ ] **HP-083**: All headings are visible and not overlapping

#### Interactive Elements (HP-084 to HP-086)
- [ ] **HP-084**: All buttons are clickable
- [ ] **HP-085**: All links are clickable and have href
- [ ] **HP-086**: External links have proper attributes

### 2.9 Footer
- [ ] **TC-079**: Verify footer is visible at bottom of page
- [ ] **TC-080**: Verify all footer sections are displayed (About, Quick Links, Resources, Connect)
- [ ] **TC-081**: Verify all footer links are clickable and navigate correctly
- [ ] **TC-082**: Verify social media icons are present and clickable
- [ ] **TC-083**: Verify copyright text is displayed
- [ ] **TC-084**: Verify disclaimer text is displayed

---

## 3. About Page (about.html) Tests
- [ ] **TC-085**: Verify page loads without errors
- [ ] **TC-086**: Verify page title is correct
- [ ] **TC-087**: Verify main heading is displayed
- [ ] **TC-088**: Verify all content sections are visible
- [ ] **TC-089**: Verify navigation links work correctly
- [ ] **TC-090**: Verify images/placeholders are loaded

---

## 4. Meditation Page (meditation.html) Tests
- [ ] **TC-091**: Verify page loads without errors
- [ ] **TC-092**: Verify page title is correct
- [ ] **TC-093**: Verify meditation content is displayed
- [ ] **TC-094**: Verify any interactive elements work (if present)
- [ ] **TC-095**: Verify navigation links work correctly

---

## 5. Breathing Page (breathing.html) Tests
- [ ] **TC-096**: Verify page loads without errors
- [ ] **TC-097**: Verify breathing exercise instructions are displayed
- [ ] **TC-098**: Verify breathing animation/timer works (if present)
- [ ] **TC-099**: Verify start/stop controls work (if present)
- [ ] **TC-100**: Verify different breathing techniques are accessible

---

## 6. Yoga Page (yoga.html) Tests
- [ ] **TC-101**: Verify page loads without errors
- [ ] **TC-102**: Verify yoga poses are displayed
- [ ] **TC-103**: Verify pose instructions are readable
- [ ] **TC-104**: Verify images/illustrations are present

---

## 7. Mindfulness Page (mindfulness.html) Tests
- [ ] **TC-105**: Verify page loads without errors
- [ ] **TC-106**: Verify mindfulness practices are displayed
- [ ] **TC-107**: Verify content is readable and well-formatted

---

## 8. Products Page (products.html) Tests
- [ ] **TC-108**: Verify page loads without errors
- [ ] **TC-109**: Verify all products are displayed
- [ ] **TC-110**: Verify product details (title, price, rating) are shown
- [ ] **TC-111**: Verify "View on Amazon" buttons work
- [ ] **TC-112**: Verify product filtering/sorting works (if present)

---

## 9. Blog Page (blog.html) Tests
- [ ] **TC-113**: Verify page loads without errors
- [ ] **TC-114**: Verify blog posts are listed
- [ ] **TC-115**: Verify blog post cards are clickable
- [ ] **TC-116**: Verify pagination works (if present)
- [ ] **TC-117**: Verify blog post content is readable

---

## 10. Contact Page (contact.html) Tests

### 10.1 Contact Form
- [ ] **TC-118**: Verify contact form is visible
- [ ] **TC-119**: Verify all form fields are present (Name, Email, Subject, Message)
- [ ] **TC-120**: Verify required fields are marked with asterisk
- [ ] **TC-121**: Verify form validation works for empty fields
- [ ] **TC-122**: Verify email validation works (invalid format)
- [ ] **TC-123**: Verify subject dropdown has correct options
- [ ] **TC-124**: Verify newsletter checkbox is present
- [ ] **TC-125**: Verify form submission shows success message
- [ ] **TC-126**: Verify form resets after submission
- [ ] **TC-127**: Verify error messages are displayed correctly

### 10.2 Chatbot
- [ ] **TC-128**: Verify chatbot section is visible
- [ ] **TC-129**: Verify chatbot header is displayed
- [ ] **TC-130**: Verify chatbot input field is present
- [ ] **TC-131**: Verify send button is clickable
- [ ] **TC-132**: Verify suggested questions are displayed
- [ ] **TC-133**: Verify clicking suggested question populates input
- [ ] **TC-134**: Verify minimize button works
- [ ] **TC-135**: Verify sound toggle button works
- [ ] **TC-136**: Verify "New Chat" button works
- [ ] **TC-137**: Verify "Email Transcript" button works
- [ ] **TC-138**: Verify chatbot messages are displayed correctly
- [ ] **TC-139**: Verify typing indicator appears (if implemented)

### 10.3 FAQ Section
- [ ] **TC-140**: Verify FAQ section is visible
- [ ] **TC-141**: Verify FAQ questions are clickable
- [ ] **TC-142**: Verify FAQ answers expand/collapse on click
- [ ] **TC-143**: Verify only one FAQ can be open at a time (accordion behavior)
- [ ] **TC-144**: Verify FAQ icons rotate on expand

---

## 11. Responsive Design Tests

### 11.1 Mobile Viewport (< 768px)
- [ ] **TC-145**: Verify layout adapts to mobile screen
- [ ] **TC-146**: Verify text is readable without zooming
- [ ] **TC-147**: Verify buttons are large enough to tap
- [ ] **TC-148**: Verify images scale correctly
- [ ] **TC-149**: Verify navigation converts to hamburger menu
- [ ] **TC-150**: Verify content doesn't overflow horizontally
- [ ] **TC-151**: Verify touch interactions work correctly

### 11.2 Tablet Viewport (768px - 1024px)
- [ ] **TC-152**: Verify layout adapts to tablet screen
- [ ] **TC-153**: Verify grid layouts adjust correctly
- [ ] **TC-154**: Verify navigation is accessible

### 11.3 Desktop Viewport (> 1024px)
- [ ] **TC-155**: Verify full desktop layout is displayed
- [ ] **TC-156**: Verify hover effects work
- [ ] **TC-157**: Verify dropdown menus work on hover

---

## 12. Accessibility Tests

### 12.1 Keyboard Navigation
- [ ] **TC-158**: Verify all interactive elements are keyboard accessible
- [ ] **TC-159**: Verify Tab key navigates through elements in correct order
- [ ] **TC-160**: Verify Enter/Space activates buttons and links
- [ ] **TC-161**: Verify Escape closes modals/menus
- [ ] **TC-162**: Verify focus indicators are visible
- [ ] **TC-163**: Verify focus trap works in mobile menu

### 12.2 Screen Reader Support
- [ ] **TC-164**: Verify all images have alt text
- [ ] **TC-165**: Verify form labels are properly associated
- [ ] **TC-166**: Verify ARIA labels are present where needed
- [ ] **TC-167**: Verify heading hierarchy is correct (h1, h2, h3)
- [ ] **TC-168**: Verify landmarks are properly marked (header, nav, main, footer)
- [ ] **TC-169**: Verify live regions announce dynamic content

### 12.3 Color Contrast
- [ ] **TC-170**: Verify text has sufficient contrast against background
- [ ] **TC-171**: Verify links are distinguishable from regular text
- [ ] **TC-172**: Verify error messages have sufficient contrast

---

## 13. Performance Tests
- [ ] **TC-173**: Verify page loads within 3 seconds
- [ ] **TC-174**: Verify images are optimized and load quickly
- [ ] **TC-175**: Verify CSS files load correctly
- [ ] **TC-176**: Verify JavaScript files load without errors
- [ ] **TC-177**: Verify no console errors on page load
- [ ] **TC-178**: Verify animations are smooth (60fps)

---

## 14. Cross-Browser Tests
- [ ] **TC-179**: Verify website works in Chrome
- [ ] **TC-180**: Verify website works in Firefox
- [ ] **TC-181**: Verify website works in Safari
- [ ] **TC-182**: Verify website works in Edge
- [ ] **TC-183**: Verify website works in mobile browsers

---

## 15. Form Validation Tests
- [ ] **TC-184**: Verify required field validation
- [ ] **TC-185**: Verify email format validation
- [ ] **TC-186**: Verify error messages are clear and helpful
- [ ] **TC-187**: Verify success messages are displayed
- [ ] **TC-188**: Verify form doesn't submit with invalid data

---

## 16. Interactive Elements Tests
- [ ] **TC-189**: Verify smooth scroll works for anchor links
- [ ] **TC-190**: Verify scroll animations trigger correctly
- [ ] **TC-191**: Verify hover effects work on buttons
- [ ] **TC-192**: Verify click events work correctly
- [ ] **TC-193**: Verify loading states are shown (if applicable)

---

## 17. SEO & Meta Tags Tests
- [ ] **TC-194**: Verify page titles are unique and descriptive
- [ ] **TC-195**: Verify meta descriptions are present
- [ ] **TC-196**: Verify canonical URLs are set correctly
- [ ] **TC-197**: Verify Open Graph tags are present
- [ ] **TC-198**: Verify Twitter Card tags are present
- [ ] **TC-199**: Verify structured data (JSON-LD) is valid

---

## 18. Error Handling Tests
- [ ] **TC-200**: Verify 404 page is displayed for invalid URLs
- [ ] **TC-201**: Verify error messages are user-friendly
- [ ] **TC-202**: Verify website doesn't crash on JavaScript errors
- [ ] **TC-203**: Verify graceful degradation when JavaScript is disabled

---

## 19. Text Alignment and Overlap Tests (Critical UI Quality Checks)

### 19.1 Website Pages List
**All pages that require text alignment/overlap testing:**
1. index.html (Homepage)
2. about.html (About Mental Health)
3. meditation.html (Meditation Guide)
4. breathing.html (Breathing Exercises)
5. yoga.html (Yoga for Mental Wellness)
6. mindfulness.html (Mindfulness Practices)
7. products.html (Wellness Products)
8. blog.html (Blog Listing)
9. contact.html (Contact Page)
10. resources.html (Resources)
11. blog-post-1.html (Blog Post 1)
12. blog-post-2.html (Blog Post 2)
13. blog-post-3.html (Blog Post 3)
14. blog/meditation-beginners.html (Blog: Meditation for Beginners)
15. blog/panic-attacks-guide.html (Blog: Panic Attacks Guide)
16. blog/supporting-depression.html (Blog: Supporting Depression)

### 19.2 Navigation & Header Text Alignment Tests (All Pages)
- [ ] **TA-001**: Verify Wellness dropdown menu is visible on hover (not hidden behind header)
- [ ] **TA-002**: Verify navigation links text is properly aligned (not overlapping)
- [ ] **TA-003**: Verify logo text and icon are aligned correctly
- [ ] **TA-004**: Verify navigation menu items do not overlap on desktop viewport
- [ ] **TA-005**: Verify navigation menu items do not overlap on tablet viewport
- [ ] **TA-006**: Verify navigation menu items do not overlap on mobile viewport
- [ ] **TA-007**: Verify dropdown menu text is left-aligned and readable
- [ ] **TA-008**: Verify dropdown menu items do not overlap with each other
- [ ] **TA-009**: Verify dropdown menu does not overflow viewport boundaries
- [ ] **TA-010**: Verify mobile menu text is properly aligned when opened

### 19.3 Hero Section Text Alignment Tests (All Pages with Hero)
- [ ] **TA-011**: Verify hero title text is centered (or left-aligned on mobile) and not overlapping
- [ ] **TA-012**: Verify hero subtitle text is properly aligned below title
- [ ] **TA-013**: Verify hero title and subtitle do not overlap
- [ ] **TA-014**: Verify hero CTA buttons text is centered and not cut off
- [ ] **TA-015**: Verify hero section text does not overflow container boundaries
- [ ] **TA-016**: Verify hero text maintains proper line height (not cramped)
- [ ] **TA-017**: Verify hero text is readable on all viewport sizes
- [ ] **TA-018**: Verify hero text does not overlap with background elements

### 19.4 Heading Text Alignment Tests (All Pages)
- [ ] **TA-019**: Verify all h1 headings are properly aligned and not overlapping
- [ ] **TA-020**: Verify all h2 headings are properly aligned and not overlapping
- [ ] **TA-021**: Verify all h3 headings are properly aligned and not overlapping
- [ ] **TA-022**: Verify headings do not overlap with preceding or following content
- [ ] **TA-023**: Verify heading text does not wrap incorrectly (no awkward line breaks)
- [ ] **TA-024**: Verify heading text maintains consistent alignment across sections
- [ ] **TA-025**: Verify centered headings (text-center) are actually centered
- [ ] **TA-026**: Verify left-aligned headings are properly left-aligned

### 19.5 Body Text Alignment Tests (All Pages)
- [ ] **TA-027**: Verify paragraph text is properly left-aligned (or justified if specified)
- [ ] **TA-028**: Verify paragraph text does not overlap with images or other elements
- [ ] **TA-029**: Verify paragraph text maintains proper line height (readable spacing)
- [ ] **TA-030**: Verify paragraph text does not overflow container boundaries
- [ ] **TA-031**: Verify long words wrap correctly (no horizontal overflow)
- [ ] **TA-032**: Verify text in cards is properly aligned within card boundaries
- [ ] **TA-033**: Verify text in lists (ul/ol) is properly aligned with bullets/numbers
- [ ] **TA-034**: Verify nested list items maintain proper indentation and alignment

### 19.5.1 Homepage (index.html) Specific Text Alignment Tests
- [ ] **TA-035**: Verify stats section numbers and labels are properly aligned
- [ ] **TA-036**: Verify stat cards text does not overlap
- [ ] **TA-037**: Verify technique cards title, description, and benefits are properly aligned
- [ ] **TA-038**: Verify technique card button text is centered and fully visible
- [ ] **TA-039**: Verify journey step numbers and text are properly aligned
- [ ] **TA-040**: Verify product card titles, prices, and ratings are properly aligned
- [ ] **TA-041**: Verify blog card titles, dates, and excerpts are properly aligned
- [ ] **TA-042**: Verify newsletter form label and input text are properly aligned
- [ ] **TA-043**: Verify footer sections text is properly aligned

### 19.5.2 About Page (about.html) Specific Text Alignment Tests
- [ ] **TA-044**: Verify accordion headers text is properly aligned
- [ ] **TA-045**: Verify accordion content text does not overlap with header
- [ ] **TA-046**: Verify stat cards text is properly aligned
- [ ] **TA-047**: Verify myth-fact cards text is properly aligned
- [ ] **TA-048**: Verify section content text maintains proper spacing

### 19.5.3 Meditation Page (meditation.html) Specific Text Alignment Tests
- [ ] **TA-049**: Verify benefit cards icon, title, and description are properly aligned
- [ ] **TA-050**: Verify benefit cards text does not overlap
- [ ] **TA-051**: Verify technique cards text is properly aligned
- [ ] **TA-052**: Verify step-by-step instructions text is properly aligned
- [ ] **TA-053**: Verify table of contents links are properly aligned

### 19.5.4 Breathing Page (breathing.html) Specific Text Alignment Tests
- [ ] **TA-054**: Verify breathing technique cards text is properly aligned
- [ ] **TA-055**: Verify breathing exercise instructions text is properly aligned
- [ ] **TA-056**: Verify timer/breathing circle text is centered and visible
- [ ] **TA-057**: Verify control buttons text is properly aligned

### 19.5.5 Yoga Page (yoga.html) Specific Text Alignment Tests
- [ ] **TA-058**: Verify benefit cards icon, title, and description are properly aligned (no overlap)
- [ ] **TA-059**: Verify yoga style cards text is properly aligned
- [ ] **TA-060**: Verify pose cards title, Sanskrit name, benefits, and instructions are properly aligned
- [ ] **TA-061**: Verify pose card text does not overlap with emoji/image
- [ ] **TA-062**: Verify sequence steps text is properly aligned
- [ ] **TA-063**: Verify product cards text is properly aligned

### 19.5.6 Mindfulness Page (mindfulness.html) Specific Text Alignment Tests
- [ ] **TA-064**: Verify practice cards text is properly aligned
- [ ] **TA-065**: Verify exercise instructions text is properly aligned
- [ ] **TA-066**: Verify step-by-step guide text maintains proper alignment

### 19.5.7 Products Page (products.html) Specific Text Alignment Tests
- [ ] **TA-067**: Verify product grid cards text is properly aligned
- [ ] **TA-068**: Verify product titles, prices, and ratings are properly aligned
- [ ] **TA-069**: Verify product descriptions text does not overflow cards
- [ ] **TA-070**: Verify filter/sort controls text is properly aligned

### 19.5.8 Blog Pages (blog.html, blog-post-*.html, blog/*.html) Specific Text Alignment Tests
- [ ] **TA-071**: Verify blog post cards title, date, and excerpt are properly aligned
- [ ] **TA-072**: Verify blog post content headings and paragraphs are properly aligned
- [ ] **TA-073**: Verify blog post meta information (author, date, read time) is properly aligned
- [ ] **TA-074**: Verify blog post images and captions are properly aligned
- [ ] **TA-075**: Verify blog post blockquotes text is properly aligned
- [ ] **TA-076**: Verify blog post code blocks text does not overflow

### 19.5.9 Contact Page (contact.html) Specific Text Alignment Tests
- [ ] **TA-077**: Verify contact form labels and inputs are properly aligned
- [ ] **TA-078**: Verify form field error messages are properly aligned and visible
- [ ] **TA-079**: Verify form field success messages are properly aligned
- [ ] **TA-080**: Verify chatbot interface text is properly aligned
- [ ] **TA-081**: Verify FAQ accordion text is properly aligned
- [ ] **TA-082**: Verify suggested questions text is properly aligned

### 19.5.10 Resources Page (resources.html) Specific Text Alignment Tests
- [ ] **TA-083**: Verify resource cards text is properly aligned
- [ ] **TA-084**: Verify resource categories text is properly aligned
- [ ] **TA-085**: Verify resource links text is properly aligned

### 19.6 Button Text Alignment Tests (All Pages)
- [ ] **TA-086**: Verify all button text is centered and fully visible
- [ ] **TA-087**: Verify button text does not overflow button boundaries
- [ ] **TA-088**: Verify button text maintains proper padding (not cramped)
- [ ] **TA-089**: Verify button text wraps correctly on small screens
- [ ] **TA-090**: Verify button text does not overlap with icons (if present)

### 19.7 Footer Text Alignment Tests (All Pages)
- [ ] **TA-091**: Verify footer section headings are properly aligned
- [ ] **TA-092**: Verify footer links text is properly aligned
- [ ] **TA-093**: Verify footer copyright text is centered
- [ ] **TA-094**: Verify footer disclaimer text is properly aligned and readable
- [ ] **TA-095**: Verify footer social media icons and text are properly aligned

### 19.8 Form Text Alignment Tests (All Pages with Forms)
- [ ] **TA-096**: Verify form labels are properly aligned with input fields
- [ ] **TA-097**: Verify form input placeholder text is properly aligned
- [ ] **TA-098**: Verify form error messages are properly aligned and visible
- [ ] **TA-099**: Verify form success messages are properly aligned
- [ ] **TA-100**: Verify form checkbox/radio labels are properly aligned
- [ ] **TA-101**: Verify form submit button text is centered

### 19.9 Card Component Text Alignment Tests (All Pages with Cards)
- [ ] **TA-102**: Verify card titles are properly aligned
- [ ] **TA-103**: Verify card descriptions are properly aligned
- [ ] **TA-104**: Verify card content does not overflow card boundaries
- [ ] **TA-105**: Verify card text maintains proper padding
- [ ] **TA-106**: Verify card footer text (if present) is properly aligned

### 19.10 Responsive Text Alignment Tests (All Pages - Multiple Viewports)
- [ ] **TA-107**: Verify text alignment is correct on mobile viewport (320px - 767px)
- [ ] **TA-108**: Verify text alignment is correct on tablet viewport (768px - 1023px)
- [ ] **TA-109**: Verify text alignment is correct on desktop viewport (1024px+)
- [ ] **TA-110**: Verify text does not overlap when viewport is resized
- [ ] **TA-111**: Verify text maintains proper alignment when zooming in/out (50% - 200%)
- [ ] **TA-112**: Verify text alignment is correct in landscape orientation
- [ ] **TA-113**: Verify text alignment is correct in portrait orientation

### 19.11 Text Overlap Detection Tests (All Pages)
- [ ] **TA-114**: Verify no text elements overlap with each other
- [ ] **TA-115**: Verify text does not overlap with images
- [ ] **TA-116**: Verify text does not overlap with buttons
- [ ] **TA-117**: Verify text does not overlap with navigation elements
- [ ] **TA-118**: Verify text does not overlap with fixed/sticky elements (header, footer)
- [ ] **TA-119**: Verify text does not overlap with modals/overlays when opened
- [ ] **TA-120**: Verify text does not overlap with dropdown menus

### 19.12 Text Truncation and Overflow Tests (All Pages)
- [ ] **TA-121**: Verify long text is properly truncated with ellipsis (where appropriate)
- [ ] **TA-122**: Verify text does not overflow horizontally (no horizontal scrollbar)
- [ ] **TA-123**: Verify text wraps correctly within containers
- [ ] **TA-124**: Verify text does not get cut off at container boundaries
- [ ] **TA-125**: Verify text maintains readability when wrapped

### 19.13 Line Height and Spacing Tests (All Pages)
- [ ] **TA-126**: Verify paragraph text has adequate line height (readable spacing)
- [ ] **TA-127**: Verify heading text has appropriate line height
- [ ] **TA-128**: Verify list items have proper spacing between them
- [ ] **TA-129**: Verify text spacing is consistent across similar elements
- [ ] **TA-130**: Verify text does not appear cramped or too spaced out

### 19.14 Text Color and Contrast Alignment Tests (All Pages)
- [ ] **TA-131**: Verify text color provides sufficient contrast against background
- [ ] **TA-132**: Verify text is readable on all background colors
- [ ] **TA-133**: Verify link text is distinguishable from regular text
- [ ] **TA-134**: Verify error message text is visible and readable
- [ ] **TA-135**: Verify success message text is visible and readable

### 19.15 Special Text Elements Alignment Tests (All Pages)
- [ ] **TA-136**: Verify breadcrumb text is properly aligned
- [ ] **TA-137**: Verify breadcrumb separators (>) are properly aligned
- [ ] **TA-138**: Verify read time indicators are properly aligned
- [ ] **TA-139**: Verify share button text is properly aligned
- [ ] **TA-140**: Verify table of contents text is properly aligned
- [ ] **TA-141**: Verify code block text is properly aligned and readable
- [ ] **TA-142**: Verify blockquote text is properly aligned and styled

---

## Test Execution Priority

### Critical (P0) - Must Pass
- Navigation functionality
- Form submissions
- Page load and basic rendering
- Mobile menu functionality
- Accessibility basics (keyboard navigation, alt text)

### High (P1) - Should Pass
- All page content visibility
- Link navigation
- Responsive design
- Form validation
- Interactive elements

### Medium (P2) - Nice to Have
- Animations
- Performance optimizations
- Cross-browser compatibility
- SEO elements

### Low (P3) - Optional
- Advanced animations
- Edge case scenarios
- Visual regression tests

---

## Test Automation Strategy

1. **Smoke Tests**: Run critical tests (P0) on every commit
2. **Regression Tests**: Run all tests before releases
3. **Visual Regression**: Compare screenshots for UI changes
4. **Performance Tests**: Monitor page load times
5. **Accessibility Tests**: Run automated a11y checks

---

## Notes
- Tests should be run in headless and headed modes
- Tests should support multiple viewport sizes
- Tests should verify both positive and negative scenarios
- Tests should include wait conditions for dynamic content
- Tests should clean up after execution (clear localStorage, etc.)

---

## Test Suite Summary

### Test Files
- `tests/navigation.spec.js` - Navigation and header tests
- `tests/homepage.spec.js` - Basic homepage functionality tests
- `tests/homepage-detailed.spec.js` - **Comprehensive homepage tests (86 detailed test cases)**
- `tests/contact-page.spec.js` - Contact page and chatbot tests
- `tests/responsive.spec.js` - Responsive design and viewport tests
- `tests/accessibility.spec.js` - Accessibility and keyboard navigation tests
- `tests/page-navigation.spec.js` - Page loading and navigation tests

### Test Count Breakdown
- **Original Test Cases (TC-001 to TC-203)**: 203 test cases
- **Homepage Detailed Tests (HP-001 to HP-086)**: 86 comprehensive test cases
- **Text Alignment and Overlap Tests (TA-001 to TA-142)**: 142 comprehensive UI quality test cases
- **Total Automated Test Cases**: 431+ test cases

### Running All Tests
All tests are automatically included when running:
```bash
npm test
```

The homepage detailed tests (`homepage-detailed.spec.js`) are automatically included in the test suite and run across all configured browsers (Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari).

