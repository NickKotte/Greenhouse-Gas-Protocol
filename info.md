# CleanEnergy Manufacturing Emissions Calculator

This app is a greenhouse gas emissions calculator built for manufacturing teams that need a practical way to estimate, organize, and communicate operational emissions. It guides a user through setting up a company workbook, defining facilities and reporting years, entering activity data, and generating a visual emissions report.

The product is structured around the Greenhouse Gas Protocol workflow. Users can create a workbook for a manufacturing company, add facilities with location and square-footage details, define inventory years, and enter emissions activity across Scope 1 and Scope 2 categories. The app then converts those inputs into emissions totals and presents the results in a report-style dashboard.

## What It Can Do

- Manage company workbook metadata, including workbook name and NAICS code.
- Track facilities with address, ZIP code, eGRID subregion, square footage, and notes.
- Track inventory years for year-over-year emissions comparisons.
- Calculate Scope 1 stationary combustion emissions from fuel usage at facilities.
- Calculate Scope 1 mobile combustion emissions from fleet fuel or distance activity.
- Calculate Scope 2 purchased electricity emissions.
- Group emissions by facility and year.
- Break down emissions by gas type, including CO2, CH4, N2O, CO2e, and biogenic CO2.
- Show annual emissions summaries with visual charts.
- Show facility-level emissions totals and estimated emissions per square foot.
- Generate report-ready views and export report output as PNG or PDF.
- Support workbook sharing and admin-style user management in the original full app design.

## Demo Mode

The current portfolio version runs as a self-contained demo. The original app depended on Supabase for authentication and database storage, but the live backend is no longer required. Demo mode uses local mock data so visitors can enter the app without credentials and explore seeded workbook, facility, activity, and report data.

In demo mode, users can click through the authentication screen with no email or password. The app opens a seeded workbook called `Evergreen Components Demo`, with example facilities, reporting years, stationary combustion entries, mobile combustion entries, purchased electricity entries, and generated results.

Demo edits are local to the browser session and are intended for exploration rather than persistence.

## Technical Highlights

- React and TypeScript frontend built with Vite.
- Mantine UI components for forms, navigation, modals, tables, and dashboard views.
- TanStack Query for the data-fetching and mutation layer.
- Nanostores for app-level state such as workbook data and authenticated user state.
- Supabase integration in the original architecture for auth, workbook data, sharing, and admin operations.
- Local mock data layer for the portfolio demo, preserving the original API hook structure while removing the need for a live backend.
- Report export support using `html-to-image`, `jsPDF`, and `jspdf-autotable`.

## Suggested Portfolio Screenshots

1. **Landing Page**
   - Shows the polished first impression and core value proposition: green manufacturing emissions tracking.
   - URL: `/`

2. **Demo Login Screen**
   - Shows the demo-friendly auth flow and the branded product entry point.
   - URL: `/login`

3. **Workbook Data Screen**
   - Best screen for showing the app's operational structure: workbook name, NAICS code, inventory years, and facilities.
   - URL: `/demo-green-manufacturing/company/workbook`

4. **Stationary Combustion Table**
   - Strong example of the calculator workflow, with facility rows, fuel types, units, editable values, and calculated CO2e totals.
   - URL: `/demo-green-manufacturing/company/stationary-combustion`

5. **Mobile Combustion or Purchased Electricity Table**
   - Good secondary workflow screenshot if the case study needs to show multiple emissions categories.
   - URLs:
     - `/demo-green-manufacturing/company/mobile-combustion`
     - `/demo-green-manufacturing/company/purchased-electricity`

6. **Emissions Report Overview**
   - Most impressive dashboard-style screenshot. It shows annual totals, charts, facility breakdowns, report export buttons, and the final output users are trying to produce.
   - URL: `/demo-green-manufacturing/company/results`

7. **Facility Breakdown Expanded**
   - Best detail screenshot for showing Scope 1 vs Scope 2 breakdowns by year and facility.
   - URL: `/demo-green-manufacturing/company/results`

Recommended screenshot set for a compact portfolio case study: Landing Page, Workbook Data Screen, Stationary Combustion Table, and Emissions Report Overview.
