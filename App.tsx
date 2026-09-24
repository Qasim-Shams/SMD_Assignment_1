import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// DUMMY DATA
const studentData = {
  name: 'Qasim',
  rollNo: '23i-3044',
  department: 'BS Software Engineering',
  semester: '7th Semester',
  cgpa: '2.5',
  sgpa: '0.00',
};

const initialAttendance = [
  {
    courseName: 'Software Mobile Development',
    records: [
      { date: '01 Sep', status: 'Absent' },
      { date: '03 Sep', status: 'Absent' },
      { date: '08 Sep', status: 'Absent' },
      { date: '10 Sep', status: 'Present' },
      { date: '15 Sep', status: 'Absent' },
      { date: '17 Sep', status: 'Absent' },
      { date: '22 Sep', status: 'Absent' },
      { date: '24 Sep', status: 'Absent' }, // 7 absents: Debarred (> 6 leaves)
    ],
  },
  {
    courseName: 'Information Security',
    records: [
      { date: '01 Sep', status: 'Present' },
      { date: '03 Sep', status: 'Present' },
      { date: '08 Sep', status: 'Absent' },
      { date: '10 Sep', status: 'Present' },
      { date: '15 Sep', status: 'Absent' },
      { date: '17 Sep', status: 'Present' },
    ],
  },
  {
    courseName: 'Parallel and Distributed Computing',
    records: [
      { date: '02 Sep', status: 'Present' },
      { date: '04 Sep', status: 'Present' },
      { date: '09 Sep', status: 'Present' },
      { date: '11 Sep', status: 'Absent' },
    ],
  },
];

// The 7 courses
const courseList = [
  { id: 1, name: 'Information Security', type: 'core' },
  { id: 2, name: 'Parallel and Distributed Computing', type: 'core' },
  { id: 3, name: 'Software Mobile Development', type: 'elective1' },
  { id: 4, name: 'Game Dev', type: 'elective1' },
  { id: 5, name: 'NLP', type: 'elective2' },
  { id: 6, name: 'Gen AI', type: 'elective2' },
  { id: 7, name: 'Final Year Project', type: 'core' },
];

const marksData = [
  {
    course: 'Information Security',
    quizzes: '12 / 15',
    assignments: '18 / 20',
    midterm: '22 / 25',
    finalExam: '35 / 40',
    total: '87 / 100',
    grade: 'A',
  },
  {
    course: 'Parallel and Distributed Computing',
    quizzes: '11 / 15',
    assignments: '16 / 20',
    midterm: '19 / 25',
    finalExam: '32 / 40',
    total: '78 / 100',
    grade: 'B+',
  },
  {
    course: 'Software Mobile Development',
    quizzes: '14 / 15',
    assignments: '19 / 20',
    midterm: '24 / 25',
    finalExam: '36 / 40',
    total: '93 / 100',
    grade: 'A+',
  },
  {
    course: 'Final Year Project',
    quizzes: 'N/A',
    assignments: 'N/A',
    midterm: '42 / 50',
    finalExam: 'In Progress',
    total: '42 / 50',
    grade: 'In Progress',
  },
];

const transcriptData = [
  {
    semester: 'Semester 1',
    gpa: '3.40',
    courses: [
      { name: 'Programming Fundamentals', grade: 'A', points: '4.00' },
      { name: 'Calculus & Analytical Geometry', grade: 'B+', points: '3.33' },
      { name: 'Applied Physics', grade: 'B', points: '3.00' },
      { name: 'English Composition', grade: 'A', points: '4.00' },
    ],
  },
  {
    semester: 'Semester 2',
    gpa: '3.50',
    courses: [
      { name: 'Object Oriented Programming', grade: 'A', points: '4.00' },
      { name: 'Digital Logic Design', grade: 'B+', points: '3.33' },
      { name: 'Linear Algebra', grade: 'A', points: '4.00' },
      { name: 'Communication Skills', grade: 'A-', points: '3.67' },
    ],
  },
  {
    semester: 'Semester 3',
    gpa: '3.60',
    courses: [
      { name: 'Data Structures', grade: 'A', points: '4.00' },
      { name: 'Computer Architecture', grade: 'B+', points: '3.33' },
      { name: 'Discrete Structures', grade: 'A', points: '4.00' },
      { name: 'Differential Equations', grade: 'B', points: '3.00' },
    ],
  },
];

const feeData = {
  challanNo: 'ISL-99881',
  dueDate: '25 October 2024',
  status: 'PAID',
  items: [
    { title: 'Tuition Fee', amount: 180000 },
    { title: 'Semester Activities', amount: 3000 },
  ],
  totalAmount: 183000,
};

// Course feedback with teacher remarks & anonymous student reviews for all courses
const initialFeedback = [
  {
    course: 'Software Mobile Development',
    instructor: 'Engr. Sarah Khan',
    teacherFeedback: 'Students should practice React Native state management and flexbox layouts.',
    studentReviews: [
      { comment: 'Very practical course, labs are very helpful.', rating: 5 },
      { comment: 'Assignments are challenging but we learn a lot.', rating: 4 },
    ],
  },
  {
    course: 'Information Security',
    instructor: 'Dr. Farhan Ali',
    teacherFeedback: 'Make sure to understand encryption algorithms and network defense tools.',
    studentReviews: [
      { comment: 'Lectures are very well explained.', rating: 5 },
      { comment: 'Quizzes are conceptual.', rating: 4 },
    ],
  },
  {
    course: 'Parallel and Distributed Computing',
    instructor: 'Prof. Tariq Jamil',
    teacherFeedback: 'Work on thread synchronization and message passing interface.',
    studentReviews: [
      { comment: 'Tough course, but very interesting topics.', rating: 4 },
    ],
  },
  {
    course: 'Game Dev',
    instructor: 'Sir Usman',
    teacherFeedback: 'Focus on 3D physics engines, game loops, and shader basics.',
    studentReviews: [
      { comment: 'Super engaging course! Final project was a playable 3D game.', rating: 5 },
      { comment: 'Lots of coding practice required.', rating: 4 },
    ],
  },
  {
    course: 'NLP',
    instructor: 'Dr. Asim',
    teacherFeedback: 'Review transformers and word tokenization before the midterm examination.',
    studentReviews: [
      { comment: 'Great depth of machine learning concepts.', rating: 5 },
      { comment: 'Challenging assignments.', rating: 4 },
    ],
  },
  {
    course: 'Gen AI',
    instructor: 'Dr. Zeeshan',
    teacherFeedback: 'Explore diffusion models, prompt engineering, and LLM fine-tuning techniques.',
    studentReviews: [
      { comment: 'Cutting edge content, very relevant to current industry demands.', rating: 5 },
      { comment: 'Instructor gives real world examples.', rating: 5 },
    ],
  },
  {
    course: 'Final Year Project',
    instructor: 'FYP Committee',
    teacherFeedback: 'All groups must submit weekly sprint reports and GitHub demo commits.',
    studentReviews: [
      { comment: 'Strict evaluation milestones keep us on schedule.', rating: 4 },
    ],
  },
];

// MAIN APP COMPONENT
export default function App() {
  // Screen state for conditional rendering
  const [currentScreen, setCurrentScreen] = useState('login');

  // Login credentials state
  const [rollNo, setRollNo] = useState('');
  const [password, setPassword] = useState('');

  // Attendance state
  const [attendance, setAttendance] = useState(initialAttendance);
  const [selectedCourseIndex, setSelectedCourseIndex] = useState(0);

  // Registered courses state
  const [registered, setRegistered] = useState([
    'Information Security',
    'Parallel and Distributed Computing',
    'Software Mobile Development',
    'Gen AI',
    'Final Year Project',
  ]);

  // Expanded review course ID in registration screen
  const [expandedRegReview, setExpandedRegReview] = useState<number | null>(null);

  // Selected course index for toggling marks
  const [selectedMarksIndex, setSelectedMarksIndex] = useState(0);

  // Fee status
  const [feeStatus, setFeeStatus] = useState(feeData.status);

  // Feedback state
  const [feedback, setFeedback] = useState(initialFeedback);
  const [feedbackCourseIndex, setFeedbackCourseIndex] = useState(0);
  const [newReviewText, setNewReviewText] = useState('');

  // Login handler
  const handleLogin = () => {
    if (rollNo && password) {
      setCurrentScreen('menu');
    } else {
      Alert.alert('Error', 'Please enter roll number and password');
    }
  };

  // Course registration selection logic
  const toggleCourse = (course: any) => {
    const isSelected = registered.includes(course.name);

    if (isSelected) {
      setRegistered(registered.filter((item) => item !== course.name));
    } else {
      // 1 out of 2 rule for SMD vs Game Dev
      if (course.name === 'Software Mobile Development') {
        const withoutOther = registered.filter((c) => c !== 'Game Dev');
        setRegistered([...withoutOther, course.name]);
      } else if (course.name === 'Game Dev') {
        const withoutOther = registered.filter((c) => c !== 'Software Mobile Development');
        setRegistered([...withoutOther, course.name]);
      }
      // 1 out of 2 rule for NLP vs Gen AI
      else if (course.name === 'NLP') {
        const withoutOther = registered.filter((c) => c !== 'Gen AI');
        setRegistered([...withoutOther, course.name]);
      } else if (course.name === 'Gen AI') {
        const withoutOther = registered.filter((c) => c !== 'NLP');
        setRegistered([...withoutOther, course.name]);
      } else {
        setRegistered([...registered, course.name]);
      }
    }
  };

  // Add sample attendance for testing debarred alert
  const addAttendanceRecord = (status: any) => {
    const active = attendance[selectedCourseIndex];
    const newRecord = { date: 'Today', status };
    const updated = [...attendance];
    updated[selectedCourseIndex] = {
      ...active,
      records: [...active.records, newRecord],
    };
    setAttendance(updated);
  };

  // Add anonymous student review (no name mentioned)
  const addStudentReview = () => {
    if (!newReviewText.trim()) {
      Alert.alert('Error', 'Please enter your review text');
      return;
    }
    const updated = [...feedback];
    updated[feedbackCourseIndex].studentReviews.push({
      comment: newReviewText,
      rating: 5,
    });
    setFeedback(updated);
    setNewReviewText('');
    Alert.alert('Success', 'Anonymous review submitted!');
  };

  // Simple back & logout top navigation bar
  const renderNavButtons = (title: any) => (
    <View style={styles.navBar}>
      <TouchableOpacity
        style={styles.navBackBtn}
        onPress={() => setCurrentScreen('menu')}
      >
        <Text style={styles.navBackText}>Back to Menu</Text>
      </TouchableOpacity>
      <Text style={styles.navTitle}>{title}</Text>
      <TouchableOpacity
        style={styles.navLogoutBtn}
        onPress={() => setCurrentScreen('login')}
      >
        <Text style={styles.navLogoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );

  // 1. LOGIN SCREEN
  if (currentScreen === 'login') {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.mainContainer}>
          <ScrollView contentContainerStyle={styles.scrollPadding}>
            <View style={styles.card}>
              <Text style={styles.headerTitle}>STUDENT PORTAL LOGIN</Text>
              <Text style={styles.subText}>Sign in with your roll number and password</Text>

              <Text style={styles.fieldLabel}>Roll Number:</Text>
              <TextInput
                style={styles.inputBox}
                value={rollNo}
                onChangeText={setRollNo}
                placeholder="e.g. 23i-3044"
              />

              <Text style={styles.fieldLabel}>Password:</Text>
              <TextInput
                style={styles.inputBox}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholder="Enter password"
              />

              <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
                <Text style={styles.primaryButtonText}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  // 2. MAIN MENU
  if (currentScreen === 'menu') {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.mainContainer}>
          <ScrollView contentContainerStyle={styles.scrollPadding}>
            <View style={styles.headerBanner}>
              <Text style={styles.headerTitle}>STUDENT PORTAL MAIN MENU</Text>
              <Text style={styles.welcomeText}>
                Welcome: {studentData.name} ({studentData.rollNo})
              </Text>
              <Text style={styles.subText}>{studentData.department} • {studentData.semester}</Text>
            </View>

            <TouchableOpacity
              style={styles.menuCardBtn}
              onPress={() => setCurrentScreen('dashboard')}
            >
              <Text style={styles.menuCardBtnText}>1. Student Academic Dashboard</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuCardBtn}
              onPress={() => setCurrentScreen('attendance')}
            >
              <Text style={styles.menuCardBtnText}>2. Attendance Monitoring & Alerts</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuCardBtn}
              onPress={() => setCurrentScreen('registration')}
            >
              <Text style={styles.menuCardBtnText}>3. Course Registration</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuCardBtn}
              onPress={() => setCurrentScreen('marks')}
            >
              <Text style={styles.menuCardBtnText}>4. View Course Wise Marks</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuCardBtn}
              onPress={() => setCurrentScreen('transcript')}
            >
              <Text style={styles.menuCardBtnText}>5. Transcript</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuCardBtn}
              onPress={() => setCurrentScreen('fee')}
            >
              <Text style={styles.menuCardBtnText}>6. Fee Challan / Details</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuCardBtn}
              onPress={() => setCurrentScreen('feedback')}
            >
              <Text style={styles.menuCardBtnText}>7. Student / Course Feedback</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dangerButton}
              onPress={() => setCurrentScreen('login')}
            >
              <Text style={styles.dangerButtonText}>Sign Out</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  // 3. STUDENT ACADEMIC DASHBOARD
  if (currentScreen === 'dashboard') {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.mainContainer}>
          {renderNavButtons('Academic Dashboard')}
          <ScrollView contentContainerStyle={styles.scrollPadding}>
            <View style={styles.card}>
              <Text style={styles.cardHeader}>Student Details</Text>
              <Text style={styles.infoLine}><Text style={styles.boldLabel}>Name: </Text>{studentData.name}</Text>
              <Text style={styles.infoLine}><Text style={styles.boldLabel}>Roll Number: </Text>{studentData.rollNo}</Text>
              <Text style={styles.infoLine}><Text style={styles.boldLabel}>Department: </Text>{studentData.department}</Text>
              <Text style={styles.infoLine}><Text style={styles.boldLabel}>Current Semester: </Text>{studentData.semester}</Text>
              <Text style={styles.infoLine}><Text style={styles.boldLabel}>CGPA: </Text>{studentData.cgpa}</Text>
              <Text style={styles.infoLine}><Text style={styles.boldLabel}>Semester GPA: </Text>{studentData.sgpa}</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardHeader}>Registered Courses ({registered.length})</Text>
              {registered.map((item, index) => (
                <Text key={index} style={styles.listItem}>• {item}</Text>
              ))}
            </View>
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  // 4. ATTENDANCE MONITORING & ALERTS
  if (currentScreen === 'attendance') {
    const activeCourse = attendance[selectedCourseIndex];
    const totalClasses = activeCourse.records.length;
    const absents = activeCourse.records.filter((r) => r.status === 'Absent').length;
    const presents = totalClasses - absents;
    const percentage = totalClasses > 0 ? Math.round((presents / totalClasses) * 100) : 100;
    const leavesLeft = 6 - absents;
    const isDebarred = absents > 6;

    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.mainContainer}>
          {renderNavButtons('Attendance Monitoring')}
          <ScrollView contentContainerStyle={styles.scrollPadding}>
            <Text style={styles.sectionLabel}>Select Course to View Attendance:</Text>
            <View style={styles.tabsRow}>
              {attendance.map((c, i) => (
                <TouchableOpacity
                  key={i}
                  style={selectedCourseIndex === i ? styles.tabActive : styles.tabInactive}
                  onPress={() => setSelectedCourseIndex(i)}
                >
                  <Text style={selectedCourseIndex === i ? styles.tabActiveText : styles.tabInactiveText}>
                    {c.courseName}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.card}>
              <Text style={styles.cardHeader}>{activeCourse.courseName}</Text>
              <Text style={styles.infoLine}><Text style={styles.boldLabel}>Total Classes: </Text>{totalClasses}</Text>
              <Text style={styles.infoLine}><Text style={styles.boldLabel}>Present: </Text>{presents}</Text>
              <Text style={styles.infoLine}><Text style={styles.boldLabel}>Absent: </Text>{absents}</Text>
              <Text style={styles.infoLine}><Text style={styles.boldLabel}>Attendance: </Text>{percentage}%</Text>
            </View>

            {/* Notification of leaves / Debarred */}
            {isDebarred ? (
              <View style={styles.debarredAlert}>
                <Text style={styles.debarredAlertText}>
                  ALERT: DEBARRED! You have {absents} absents (more than 6 leaves). You are debarred from the exam!
                </Text>
              </View>
            ) : (
              <View style={styles.noticeAlert}>
                <Text style={styles.noticeAlertText}>
                  Notification: You have used {absents} out of 6 leaves. You have {leavesLeft} leaves remaining.
                </Text>
              </View>
            )}

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.greenBtn}
                onPress={() => addAttendanceRecord('Present')}
              >
                <Text style={styles.btnTextWhite}>+ Add Present Class</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.redBtn}
                onPress={() => addAttendanceRecord('Absent')}
              >
                <Text style={styles.btnTextWhite}>+ Add Absent Class</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardHeader}>Class Dates & History</Text>
              {activeCourse.records.map((r, idx) => (
                <View key={idx} style={styles.historyRow}>
                  <Text style={styles.historyText}>Class #{idx + 1} ({r.date})</Text>
                  <Text style={r.status === 'Present' ? styles.statusPresent : styles.statusAbsent}>
                    {r.status}
                  </Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  // 5. COURSE REGISTRATION (WITH TEACHER REVIEWS)
  if (currentScreen === 'registration') {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.mainContainer}>
          {renderNavButtons('Course Registration')}
          <ScrollView contentContainerStyle={styles.scrollPadding}>
            <View style={styles.rulesCard}>
              <Text style={styles.rulesTitle}>Course Registration Rules:</Text>
              <Text style={styles.ruleItem}>• Mobile Dev OR Game Dev: Choose 1 out of 2.</Text>
              <Text style={styles.ruleItem}>• NLP OR Gen AI: Choose 1 out of 2.</Text>
              <Text style={styles.ruleItem}>• Core courses are mandatory.</Text>
            </View>

            <Text style={styles.sectionLabel}>Available Courses (7 Courses):</Text>
            {courseList.map((c) => {
              const isSelected = registered.includes(c.name);
              const courseFeedbackItem = feedback.find((f) => f.course === c.name);
              const isReviewsExpanded = expandedRegReview === c.id;

              return (
                <View key={c.id} style={isSelected ? styles.courseCardSelected : styles.courseCard}>
                  <View style={styles.courseHeaderRow}>
                    <View style={styles.courseTitleCol}>
                      <Text style={styles.courseNameText}>{c.name}</Text>
                      <Text style={styles.courseTypeBadge}>
                        {c.type === 'core'
                          ? 'Core'
                          : c.type === 'elective1'
                            ? 'Elective 1 (Choose 1)'
                            : 'Elective 2 (Choose 1)'}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={isSelected ? styles.removeBtn : styles.selectBtn}
                      onPress={() => toggleCourse(c)}
                    >
                      <Text style={styles.btnTextWhite}>
                        {isSelected ? 'Remove' : 'Select'}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {/* Button to view teacher feedback and anonymous student reviews during registration */}
                  <TouchableOpacity
                    style={styles.reviewToggleBtn}
                    onPress={() =>
                      setExpandedRegReview(isReviewsExpanded ? null : c.id)
                    }
                  >
                    <Text style={styles.reviewToggleText}>
                      {isReviewsExpanded
                        ? '▲ Hide Teacher & Student Reviews'
                        : '▼ View Teacher & Student Reviews'}
                    </Text>
                  </TouchableOpacity>

                  {/* Expanded Teacher and Anonymous Student Reviews */}
                  {isReviewsExpanded && (
                    <View style={styles.reviewsDetailBox}>
                      <Text style={styles.reviewSubHeader}>
                        Instructor: {courseFeedbackItem ? courseFeedbackItem.instructor : 'Course Faculty'}
                      </Text>

                      <Text style={styles.boldLabel}>Teacher's Feedback/Remarks:</Text>
                      <Text style={styles.feedbackQuote}>
                        "{courseFeedbackItem ? courseFeedbackItem.teacherFeedback : 'Work hard and stay consistent with course materials.'}"
                      </Text>

                      <Text style={[styles.boldLabel, styles.topSpacing]}>
                        Student Reviews (Anonymous - No Names):
                      </Text>
                      {courseFeedbackItem && courseFeedbackItem.studentReviews.length > 0 ? (
                        courseFeedbackItem.studentReviews.map((rev, rIndex) => (
                          <View key={rIndex} style={styles.reviewRow}>
                            <Text style={styles.anonymousAuthor}>
                              • Anonymous Student ({rev.rating}/5 stars):
                            </Text>
                            <Text style={styles.reviewBodyText}>"{rev.comment}"</Text>
                          </View>
                        ))
                      ) : (
                        <Text style={styles.subText}>No student reviews yet.</Text>
                      )}
                    </View>
                  )}
                </View>
              );
            })}

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() =>
                Alert.alert(
                  'Registration Confirmed',
                  `You are registered in ${registered.length} courses:\n\n${registered.join('\n')}`
                )
              }
            >
              <Text style={styles.primaryButtonText}>
                Confirm Registration ({registered.length} Selected)
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  // 6. VIEW COURSE WISE MARKS (WITH COURSE TOGGLING)
  if (currentScreen === 'marks') {
    const activeCourseMarks = marksData[selectedMarksIndex];

    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.mainContainer}>
          {renderNavButtons('Course Wise Marks')}
          <ScrollView contentContainerStyle={styles.scrollPadding}>
            <Text style={styles.sectionLabel}>Toggle Course to View Marks:</Text>

            {/* Course Toggle Tabs */}
            <View style={styles.tabsRow}>
              {marksData.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={selectedMarksIndex === index ? styles.tabActive : styles.tabInactive}
                  onPress={() => setSelectedMarksIndex(index)}
                >
                  <Text
                    style={selectedMarksIndex === index ? styles.tabActiveText : styles.tabInactiveText}
                  >
                    {item.course}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Active Course Marks Table */}
            <View style={styles.card}>
              <Text style={styles.cardHeader}>{activeCourseMarks.course} Marks</Text>

              <View style={styles.table}>
                <View style={styles.tableHeaderRow}>
                  <Text style={styles.tableHeaderCellFlex}>Evaluation Component</Text>
                  <Text style={styles.tableHeaderCellCenter}>Marks Obtained</Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCellFlex}>Quizzes</Text>
                  <Text style={styles.tableCellCenter}>{activeCourseMarks.quizzes}</Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCellFlex}>Assignments</Text>
                  <Text style={styles.tableCellCenter}>{activeCourseMarks.assignments}</Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCellFlex}>Midterm Exam</Text>
                  <Text style={styles.tableCellCenter}>{activeCourseMarks.midterm}</Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCellFlex}>Final Exam</Text>
                  <Text style={styles.tableCellCenter}>{activeCourseMarks.finalExam}</Text>
                </View>
                <View style={styles.tableRowTotal}>
                  <Text style={styles.tableCellBoldFlex}>Total Marks</Text>
                  <Text style={styles.tableCellBoldCenter}>{activeCourseMarks.total}</Text>
                </View>
                <View style={styles.tableRowTotal}>
                  <Text style={styles.tableCellBoldFlex}>Grade</Text>
                  <Text style={styles.gradeHighlight}>{activeCourseMarks.grade}</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  // 7. TRANSCRIPT (TABLE FORMAT)
  if (currentScreen === 'transcript') {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.mainContainer}>
          {renderNavButtons('Official Transcript')}
          <ScrollView contentContainerStyle={styles.scrollPadding}>
            <View style={styles.cgpaBanner}>
              <Text style={styles.cgpaTitle}>Cumulative CGPA: {studentData.cgpa}</Text>
              <Text style={styles.cgpaSub}>Program: {studentData.department}</Text>
            </View>

            {transcriptData.map((sem, sIdx) => (
              <View key={sIdx} style={styles.card}>
                <View style={styles.semesterHeaderRow}>
                  <Text style={styles.semesterTitle}>{sem.semester}</Text>
                  <Text style={styles.semesterGpaBadge}>GPA: {sem.gpa}</Text>
                </View>

                {/* Table for Courses in Semester */}
                <View style={styles.table}>
                  <View style={styles.tableHeaderRow}>
                    <Text style={styles.tableHeaderCellFlex}>Course Name</Text>
                    <Text style={styles.tableHeaderCellCenter}>Grade</Text>
                    <Text style={styles.tableHeaderCellCenter}>Points</Text>
                  </View>
                  {sem.courses.map((c, cIdx) => (
                    <View key={cIdx} style={styles.tableRow}>
                      <Text style={styles.tableCellFlex}>{c.name}</Text>
                      <Text style={styles.tableCellBoldCenter}>{c.grade}</Text>
                      <Text style={styles.tableCellCenter}>{c.points}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  // 8. FEE CHALLAN / DETAILS
  if (currentScreen === 'fee') {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.mainContainer}>
          {renderNavButtons('Fee Challan')}
          <ScrollView contentContainerStyle={styles.scrollPadding}>
            <View style={styles.card}>
              <Text style={styles.cardHeader}>Student Fee Voucher</Text>
              <Text style={styles.infoLine}><Text style={styles.boldLabel}>Challan Number: </Text>{feeData.challanNo}</Text>
              <Text style={styles.infoLine}><Text style={styles.boldLabel}>Due Date: </Text>{feeData.dueDate}</Text>
              <Text style={styles.infoLine}>
                <Text style={styles.boldLabel}>Status: </Text>
                <Text style={feeStatus === 'PAID' ? styles.statusPresent : styles.statusAbsent}>{feeStatus}</Text>
              </Text>

              <Text style={[styles.boldLabel, styles.topSpacing]}>Fee Particulars:</Text>
              <View style={styles.table}>
                <View style={styles.tableHeaderRow}>
                  <Text style={styles.tableHeaderCellFlex}>Description</Text>
                  <Text style={styles.tableHeaderCellCenter}>Amount</Text>
                </View>
                {feeData.items.map((it, idx) => (
                  <View key={idx} style={styles.tableRow}>
                    <Text style={styles.tableCellFlex}>{it.title}</Text>
                    <Text style={styles.tableCellCenter}>Rs. {it.amount}</Text>
                  </View>
                ))}
                <View style={styles.tableRowTotal}>
                  <Text style={styles.tableCellBoldFlex}>Total Payable</Text>
                  <Text style={styles.tableCellBoldCenter}>Rs. {feeData.totalAmount}</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => setFeeStatus(feeStatus === 'PAID' ? 'UNPAID' : 'PAID')}
            >
              <Text style={styles.secondaryButtonText}>
                Toggle Fee Status (Currently: {feeStatus})
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  // 9. STUDENT / COURSE & TEACHER FEEDBACK
  if (currentScreen === 'feedback') {
    const activeItem = feedback[feedbackCourseIndex];

    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.mainContainer}>
          {renderNavButtons('Course & Teacher Feedback')}
          <ScrollView contentContainerStyle={styles.scrollPadding}>
            <Text style={styles.sectionLabel}>Select Course:</Text>
            <View style={styles.tabsRow}>
              {feedback.map((f, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={feedbackCourseIndex === idx ? styles.tabActive : styles.tabInactive}
                  onPress={() => setFeedbackCourseIndex(idx)}
                >
                  <Text
                    style={feedbackCourseIndex === idx ? styles.tabActiveText : styles.tabInactiveText}
                  >
                    {f.course}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.card}>
              <Text style={styles.cardHeader}>{activeItem.course}</Text>
              <Text style={styles.infoLine}><Text style={styles.boldLabel}>Instructor: </Text>{activeItem.instructor}</Text>

              <Text style={[styles.boldLabel, styles.topSpacing]}>Teacher's Feedback to Class:</Text>
              <Text style={styles.feedbackQuote}>"{activeItem.teacherFeedback}"</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardHeader}>Student Reviews (Anonymous - No Names)</Text>
              {activeItem.studentReviews.map((rev, rIdx) => (
                <View key={rIdx} style={styles.reviewRow}>
                  <Text style={styles.anonymousAuthor}>
                    • Anonymous Student ({rev.rating}/5 stars):
                  </Text>
                  <Text style={styles.reviewBodyText}>"{rev.comment}"</Text>
                </View>
              ))}
            </View>

            <View style={styles.card}>
              <Text style={styles.cardHeader}>Add Your Anonymous Review</Text>
              <TextInput
                style={styles.inputBox}
                value={newReviewText}
                onChangeText={setNewReviewText}
                placeholder="Write your constructive review here..."
              />
              <TouchableOpacity style={styles.primaryButton} onPress={addStudentReview}>
                <Text style={styles.primaryButtonText}>Submit Review</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F1F5F9',
  },
  scrollPadding: {
    padding: 16,
    paddingBottom: 40,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1E3A8A',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  navTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navBackBtn: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
  },
  navBackText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  navLogoutBtn: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
  },
  navLogoutText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  headerBanner: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  welcomeText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2563EB',
    marginBottom: 2,
  },
  subText: {
    fontSize: 13,
    color: '#64748B',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: 6,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    marginTop: 8,
    marginBottom: 4,
  },
  inputBox: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    marginBottom: 10,
  },
  primaryButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 8,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#64748B',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 6,
  },
  secondaryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  dangerButton: {
    backgroundColor: '#EF4444',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  dangerButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  menuCardBtn: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    marginBottom: 10,
  },
  menuCardBtnText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1E3A8A',
  },
  infoLine: {
    fontSize: 14,
    color: '#334155',
    marginVertical: 3,
  },
  boldLabel: {
    fontWeight: 'bold',
    color: '#1E293B',
  },
  listItem: {
    fontSize: 14,
    color: '#334155',
    marginVertical: 2,
    paddingLeft: 4,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#334155',
    marginBottom: 8,
  },
  tabsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  tabActive: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  tabActiveText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
  },
  tabInactive: {
    backgroundColor: '#E2E8F0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  tabInactiveText: {
    color: '#334155',
    fontSize: 13,
  },
  debarredAlert: {
    backgroundColor: '#FEE2E2',
    borderColor: '#EF4444',
    borderWidth: 1,
    borderRadius: 6,
    padding: 12,
    marginBottom: 12,
  },
  debarredAlertText: {
    color: '#B91C1C',
    fontWeight: 'bold',
    fontSize: 13,
  },
  noticeAlert: {
    backgroundColor: '#FEF3C7',
    borderColor: '#F59E0B',
    borderWidth: 1,
    borderRadius: 6,
    padding: 12,
    marginBottom: 12,
  },
  noticeAlertText: {
    color: '#B45309',
    fontWeight: 'bold',
    fontSize: 13,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  greenBtn: {
    flex: 1,
    backgroundColor: '#16A34A',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  redBtn: {
    flex: 1,
    backgroundColor: '#DC2626',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  btnTextWhite: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
  },
  historyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  historyText: {
    fontSize: 13,
    color: '#334155',
  },
  statusPresent: {
    color: '#16A34A',
    fontWeight: 'bold',
    fontSize: 13,
  },
  statusAbsent: {
    color: '#DC2626',
    fontWeight: 'bold',
    fontSize: 13,
  },
  rulesCard: {
    backgroundColor: '#EFF6FF',
    borderColor: '#93C5FD',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  rulesTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E40AF',
    marginBottom: 4,
  },
  ruleItem: {
    fontSize: 13,
    color: '#1E3A8A',
    marginVertical: 1,
  },
  courseCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    padding: 14,
    marginBottom: 10,
  },
  courseCardSelected: {
    backgroundColor: '#F0FDF4',
    borderWidth: 1.5,
    borderColor: '#22C55E',
    borderRadius: 8,
    padding: 14,
    marginBottom: 10,
  },
  courseHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  courseTitleCol: {
    flex: 1,
    marginRight: 8,
  },
  courseNameText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  courseTypeBadge: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  selectBtn: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  removeBtn: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  reviewToggleBtn: {
    marginTop: 10,
    paddingVertical: 4,
  },
  reviewToggleText: {
    fontSize: 13,
    color: '#2563EB',
    fontWeight: '600',
  },
  reviewsDetailBox: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  reviewSubHeader: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#475569',
    marginBottom: 4,
  },
  feedbackQuote: {
    fontSize: 13,
    fontStyle: 'italic',
    color: '#334155',
    marginVertical: 2,
  },
  topSpacing: {
    marginTop: 8,
  },
  reviewRow: {
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  anonymousAuthor: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1E40AF',
  },
  reviewBodyText: {
    fontSize: 13,
    color: '#334155',
    marginLeft: 6,
  },
  table: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 6,
    overflow: 'hidden',
    marginTop: 8,
  },
  tableHeaderRow: {
    flexDirection: 'row',
    backgroundColor: '#E2E8F0',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CBD5E1',
  },
  tableHeaderCellFlex: {
    flex: 2,
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  tableHeaderCellCenter: {
    flex: 1,
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1E293B',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    backgroundColor: '#FFFFFF',
  },
  tableCellFlex: {
    flex: 2,
    fontSize: 13,
    color: '#334155',
  },
  tableCellCenter: {
    flex: 1,
    fontSize: 13,
    color: '#334155',
    textAlign: 'center',
  },
  tableCellBoldFlex: {
    flex: 2,
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  tableCellBoldCenter: {
    flex: 1,
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1E293B',
    textAlign: 'center',
  },
  tableRowTotal: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#F8FAFC',
    borderTopWidth: 1,
    borderTopColor: '#CBD5E1',
  },
  gradeHighlight: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#16A34A',
    textAlign: 'center',
  },
  cgpaBanner: {
    backgroundColor: '#1E3A8A',
    borderRadius: 8,
    padding: 16,
    marginBottom: 14,
  },
  cgpaTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  cgpaSub: {
    fontSize: 13,
    color: '#BFDBFE',
    marginTop: 2,
  },
  semesterHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  semesterTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  semesterGpaBadge: {
    backgroundColor: '#DBEAFE',
    color: '#1D4ED8',
    fontSize: 13,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
});
