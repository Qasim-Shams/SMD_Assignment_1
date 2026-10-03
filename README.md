# EnhancedFlex - Student Academic Portal

A comprehensive Student Portal mobile application built with **React Native** and **TypeScript** for the Mobile Application Development (SMD) assignment.

---

## Project Overview

**EnhancedFlex** modernizes the university student portal experience. It gives students full control over their academic life—from personalized dashboards and dynamic course registration to real-time attendance monitoring with academic alerts, comprehensive marks analysis, semester transcripts, fee vouchers, and peer-to-peer course reviews.

---

## Key Features and Innovations

### 1. Interactive Visual Analytics (react-native-chart-kit)
* **Marks Distribution Pie Chart (Out of 100)**: Visualizes marks obtained versus remaining marks for any selected course. Includes interactive course toggle tabs and a detailed score breakdown (Quizzes, Assignments, Midterms, and Final Exam).
* **Attendance Comparison Bar Chart**: Highlights percentage of attendance across all enrolled courses relative to the university's 75% examination eligibility requirement.
* **Attendance Progress Rings (ProgressChart)**: Multi-ring progress visualization representing semester-long class attendance completion towards 100%.
* **Cross-Screen Integration**: Charts are embedded in the **Academic Dashboard**, the **Attendance Monitoring** screen, and the **Course Wise Marks** screen.

### 2. Peer Reviews During Course Registration
* **Informed Decision Making**: Students can expand and read instructor guidelines and genuine, anonymous student reviews directly within the **Course Registration** screen before committing to an enrollment.
* **Strict Review Governance**: On the **Course & Teacher Feedback** screen, students can **only write reviews for courses they are currently registered for**. Unregistered courses are hidden from the review submission list to prevent unqualified reviews.

### 3. Leave-Based Attendance Monitoring and Debarment Alert
* **Leaves Counter**: Rather than just displaying an abstract percentage, the system actively calculates and shows how many leaves the student has used out of the allowed limit (e.g. *"You have used 3 out of 6 leaves. You have 3 leaves remaining"*).
* **Automatic Debarment Notification**: If absences exceed the 6-leave limit, a prominent **DEBARRED ALERT** is triggered, warning the student that they are barred from the examination for that course.
* **Interactive Class Simulation**: Students can simulate recording new classes as *Present* or *Absent*, with dynamic recalculation of attendance history, percentage, and leaves in real-time.

### 4. Academic Management Suite
* **Student Academic Dashboard**: Quick access to roll number, department, semester, CGPA, SGPA, and registered course summaries alongside visual analytics.
* **Course Registration with Elective Rules**: Enforces mandatory academic rules:
  * *Software Mobile Development* OR *Game Dev* (Choose 1 out of 2)
  * *NLP* OR *Gen AI* (Choose 1 out of 2)
  * Mandatory core courses (*Information Security*, *Parallel and Distributed Computing*, *Final Year Project*).
* **Course Wise Marks Evaluation**: Switch between enrolled courses to inspect itemized evaluations (Quizzes, Assignments, Midterm, Final Exam, Total Score, and Letter Grade).
* **Official Transcript**: Structured semester-wise grade tables displaying course titles, letter grades, and grade points, accompanied by a cumulative CGPA banner.
* **Fee Challan Voucher**: Itemized breakdown of tuition, admission, and lab charges with real-time payment status toggle (*PAID* / *UNPAID*).
* **Edge-to-Edge Status Bar Safe Padding**: Fixed system status bar collision so headers and navigation bars sit comfortably below the Android clock and camera notch.

---

## Screenshots Gallery

| Screen | Description | Screenshot |
| :--- | :--- | :---: |
| **Login Screen** | Secure roll number and password authentication | ![Login](./Screenshots/1%20login%201.jpg) |
| **Main Menu** | Navigation hub to all 7 academic modules | ![Main Menu](./Screenshots/2%20main%20menu.jpg) |
| **Academic Dashboard (Part 1)** | Student bio, GPA, and course marks pie chart | ![Dashboard 1](./Screenshots/3%20academic%20dashboard%201.jpg) |
| **Academic Dashboard (Part 2)** | Attendance bar chart and progress rings | ![Dashboard 2](./Screenshots/4%20academic%20dashboard%202.jpg) |
| **Attendance Monitoring (Part 1)** | Leave notification (out of 6) and attendance stats | ![Attendance 1](./Screenshots/5%20attendance%201.jpg) |
| **Attendance Monitoring (Part 2)** | Class history and comparative bar chart | ![Attendance 2](./Screenshots/6%20attendance%202.jpg) |
| **Course Registration (Rules & List)** | Elective validation and course catalog | ![Course Reg 1](./Screenshots/7%20course%20reg%201.jpg) |
| **Course Registration (Reviews)** | Viewing instructor feedback and student reviews | ![Course Reg 2](./Screenshots/8%20course%20reg%202.jpg) |
| **Course Wise Marks (Table)** | Itemized evaluation component breakdown | ![Marks 1](./Screenshots/9%20marks%201.jpg) |
| **Course Wise Marks (Pie Chart)** | Score visualizer out of 100 marks | ![Marks 2](./Screenshots/9%20marks%202.jpg) |
| **Official Transcript** | Semester-wise grade tables and CGPA banner | ![Transcript](./Screenshots/10%20transcript.jpg) |
| **Fee Challan** | Voucher details, due date, and payment status | ![Fee Challan](./Screenshots/11%20fee%20challan.jpg) |
| **Course & Teacher Feedback** | Anonymous review submission for enrolled courses | ![Feedback](./Screenshots/12%20feedback.jpg) |

---

## Tech Stack and Dependencies

* **Framework**: React Native `0.87.1` (React `19.2.3`)
* **Language**: TypeScript (`^6.0.3`)
* **Visual Charts**: `react-native-chart-kit` (`^6.12.0`)
* **Vector Graphics**: `react-native-svg` (`^15.15.2`)
* **Styling**: Vanilla React Native `StyleSheet`

---

## How to Build and Run the App

### Prerequisites
1. **Node.js** (>= 22.11.0 recommended)
2. **Android SDK & Platform Tools** (with `adb` configured in PATH)
3. **Physical Android Device** connected via USB with **USB Debugging** enabled (or an Android Emulator running)

---

### Step 1: Install Dependencies
Open a terminal in the project root directory and run:
```bash
npm install --legacy-peer-deps
```

---

### Step 2: Configure Device Port Forwarding
If testing on a physical Android device connected via USB, forward Metro ports:
```bash
adb reverse tcp:8081 tcp:8081
adb reverse tcp:8082 tcp:8082
```

---

### Step 3: Run the Application
Start the Metro server and install the app on your connected device/emulator:
```bash
npm run android
```
*(Alternatively: `npx react-native run-android`)*

---

### Step 4: Standalone APK Compilation (Optional)
To build a standalone installable debug APK directly:
```powershell
cd android
.\gradlew assembleDebug
```
The compiled APK will be generated at:
```
android/app/build/outputs/apk/debug/app-debug.apk
```
You can install it onto any connected phone using:
```bash
adb install -r android/app/build/outputs/apk/debug/app-debug.apk
```

---

## Testing

To execute automated tests:
```bash
npm test
```
To run the TypeScript type checker:
```bash
npx tsc --noEmit
```
