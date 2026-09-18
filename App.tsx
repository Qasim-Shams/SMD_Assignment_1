import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// DUMMY DATA (SIMPLE ARRAYS & VARIABLES)
const studentData = {
  name: 'Ali Khan',
  rollNo: '21K-3210',
  department: 'BS Computer Science',
  semester: '7th Semester',
  cgpa: '3.45',
  sgpa: '3.60',
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
      { date: '24 Sep', status: 'Absent' }, // 7 absents -> Debarred (> 6 leaves)
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
      { name: 'Programming Fundamentals', grade: 'A' },
      { name: 'Calculus', grade: 'B+' },
      { name: 'Applied Physics', grade: 'B' },
      { name: 'English Composition', grade: 'A' },
    ],
  },
  {
    semester: 'Semester 2',
    gpa: '3.50',
    courses: [
      { name: 'Object Oriented Programming', grade: 'A' },
      { name: 'Digital Logic Design', grade: 'B+' },
      { name: 'Linear Algebra', grade: 'A' },
    ],
  },
  {
    semester: 'Semester 3',
    gpa: '3.60',
    courses: [
      { name: 'Data Structures', grade: 'A' },
      { name: 'Computer Architecture', grade: 'B+' },
      { name: 'Discrete Structures', grade: 'A' },
    ],
  },
];

const feeData = {
  challanNo: 'CHL-99881',
  dueDate: '25 October 2024',
  status: 'PAID',
  items: [
    { title: 'Tuition Fee', amount: 80000 },
    { title: 'Lab Charges', amount: 8000 },
    { title: 'Exam Fee', amount: 4000 },
  ],
  totalAmount: 92000,
};

const initialFeedback = [
  {
    course: 'Software Mobile Development',
    teacherFeedback: 'Students should practice React Native state management.',
    studentReviews: [
      { comment: 'Very practical course, labs are very helpful.', rating: 5 },
      { comment: 'Assignments are challenging but we learn a lot.', rating: 4 },
    ],
  },
  {
    course: 'Information Security',
    teacherFeedback: 'Make sure to understand encryption algorithms.',
    studentReviews: [
      { comment: 'Lectures are very well explained.', rating: 5 },
      { comment: 'Quizzes are conceptual.', rating: 4 },
    ],
  },
  {
    course: 'Parallel and Distributed Computing',
    teacherFeedback: 'Work on thread synchronization and MPI.',
    studentReviews: [
      { comment: 'Tough course, but very interesting topics.', rating: 4 },
    ],
  },
];

// MAIN APP COMPONENT
export default function App() {
  // Screen state for conditional rendering
  const [currentScreen, setCurrentScreen] = useState('login');

  // Login credentials state
  const [rollNo, setRollNo] = useState('21K-3210');
  const [password, setPassword] = useState('12345');

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

  // Simple back & logout buttons
  const renderNavButtons = (title: any) => (
    <View>
      <Text>{title}</Text>
      <Button title="Back to Menu" onPress={() => setCurrentScreen('menu')} />
      <Button title="Logout" onPress={() => setCurrentScreen('login')} />
    </View>
  );

  // 1. LOGIN SCREEN
  if (currentScreen === 'login') {
    return (
      <SafeAreaProvider>
        <SafeAreaView>
          <ScrollView>
            <Text>STUDENT PORTAL LOGIN</Text>

            <Text>Roll Number:</Text>
            <TextInput
              value={rollNo}
              onChangeText={setRollNo}
              placeholder="Roll Number"
            />

            <Text>Password:</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder="Password"
            />

            <Text>
              (Login details available: Roll No: {rollNo}, Password: {password})
            </Text>

            <Button title="Sign In" onPress={handleLogin} />
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  // 2. MAIN MENU
  if (currentScreen === 'menu') {
    return (
      <SafeAreaProvider>
        <SafeAreaView>
          <ScrollView>
            <Text>STUDENT PORTAL MAIN MENU</Text>
            <Text>
              Welcome: {studentData.name} ({studentData.rollNo})
            </Text>

            <Button
              title="1. Student Academic Dashboard"
              onPress={() => setCurrentScreen('dashboard')}
            />
            <Button
              title="2. Attendance Monitoring & Alerts"
              onPress={() => setCurrentScreen('attendance')}
            />
            <Button
              title="3. Course Registration"
              onPress={() => setCurrentScreen('registration')}
            />
            <Button
              title="4. View Course Wise Marks"
              onPress={() => setCurrentScreen('marks')}
            />
            <Button
              title="5. Transcript"
              onPress={() => setCurrentScreen('transcript')}
            />
            <Button
              title="6. Fee Challan / Details"
              onPress={() => setCurrentScreen('fee')}
            />
            <Button
              title="7. Student / Course Feedback"
              onPress={() => setCurrentScreen('feedback')}
            />

            <Button
              title="Sign Out"
              onPress={() => setCurrentScreen('login')}
            />
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  // 3. STUDENT ACADEMIC DASHBOARD
  if (currentScreen === 'dashboard') {
    return (
      <SafeAreaProvider>
        <SafeAreaView>
          <ScrollView>
            {renderNavButtons('Academic Dashboard')}

            <Text>STUDENT DETAILS:</Text>
            <Text>Name: {studentData.name}</Text>
            <Text>Roll Number: {studentData.rollNo}</Text>
            <Text>Department: {studentData.department}</Text>
            <Text>Current Semester: {studentData.semester}</Text>
            <Text>CGPA: {studentData.cgpa}</Text>
            <Text>Semester GPA: {studentData.sgpa}</Text>

            <Text>REGISTERED COURSES:</Text>
            {registered.map((item, index) => (
              <Text key={index}>- {item}</Text>
            ))}
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
        <SafeAreaView>
          <ScrollView>
            {renderNavButtons('Attendance Monitoring')}

            <Text>Select Course:</Text>
            {attendance.map((c, i) => (
              <Button
                key={i}
                title={`${c.courseName} ${selectedCourseIndex === i ? '(Active)' : ''}`}
                onPress={() => setSelectedCourseIndex(i)}
              />
            ))}

            <Text>COURSE: {activeCourse.courseName}</Text>
            <Text>Total Classes: {totalClasses}</Text>
            <Text>Present: {presents}</Text>
            <Text>Absent: {absents}</Text>
            <Text>Attendance Percentage: {percentage}%</Text>

            {/* Notification of leaves / Debarred */}
            {isDebarred ? (
              <Text>
                ALERT: DEBARRED! You have {absents} absents (more than 6 leaves). You are debarred
                from the exam!
              </Text>
            ) : (
              <Text>
                Notification: You have used {absents} out of 6 leaves. You have {leavesLeft} leaves
                remaining.
              </Text>
            )}

            <Button title="+ Add Present Class" onPress={() => addAttendanceRecord('Present')} />
            <Button title="+ Add Absent Class" onPress={() => addAttendanceRecord('Absent')} />

            <Text>Class Dates & Status:</Text>
            {activeCourse.records.map((r, idx) => (
              <Text key={idx}>
                Class #{idx + 1} ({r.date}): {r.status}
              </Text>
            ))}
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  // 5. COURSE REGISTRATION
  if (currentScreen === 'registration') {
    return (
      <SafeAreaProvider>
        <SafeAreaView>
          <ScrollView>
            {renderNavButtons('Course Registration')}

            <Text>RULES:</Text>
            <Text>• Mobile Dev OR Game Dev: You can only choose 1 out of 2.</Text>
            <Text>• NLP OR Gen AI: You can only choose 1 out of 2.</Text>

            <Text>COURSES OFFERED (Click button to select or remove):</Text>
            {courseList.map((c) => {
              const isSelected = registered.includes(c.name);
              return (
                <View key={c.id}>
                  <Text>
                    {c.name} [{c.type}] - Status: {isSelected ? 'SELECTED' : 'NOT SELECTED'}
                  </Text>
                  <Button
                    title={isSelected ? `Remove ${c.name}` : `Select ${c.name}`}
                    onPress={() => toggleCourse(c)}
                  />
                </View>
              );
            })}

            <Button
              title={`Confirm Registration (${registered.length} Selected)`}
              onPress={() =>
                Alert.alert(
                  'Confirmed',
                  `Registered courses:\n\n${registered.join('\n')}`
                )
              }
            />
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  // 6. VIEW COURSE WISE MARKS
  if (currentScreen === 'marks') {
    return (
      <SafeAreaProvider>
        <SafeAreaView>
          <ScrollView>
            {renderNavButtons('Course Wise Marks')}

            {marksData.map((item, index) => (
              <View key={index}>
                <Text>Course: {item.course}</Text>
                <Text>Quizzes: {item.quizzes}</Text>
                <Text>Assignments: {item.assignments}</Text>
                <Text>Midterm: {item.midterm}</Text>
                <Text>Final Exam: {item.finalExam}</Text>
                <Text>Total: {item.total}</Text>
                <Text>Grade: {item.grade}</Text>
              </View>
            ))}
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  // 7. TRANSCRIPT
  if (currentScreen === 'transcript') {
    return (
      <SafeAreaProvider>
        <SafeAreaView>
          <ScrollView>
            {renderNavButtons('Transcript')}

            <Text>Cumulative CGPA: {studentData.cgpa}</Text>

            {transcriptData.map((sem, sIdx) => (
              <View key={sIdx}>
                <Text>
                  {sem.semester} (GPA: {sem.gpa})
                </Text>
                {sem.courses.map((c, cIdx) => (
                  <Text key={cIdx}>
                    - {c.name}: Grade {c.grade}
                  </Text>
                ))}
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
        <SafeAreaView>
          <ScrollView>
            {renderNavButtons('Fee Challan')}

            <Text>Challan Number: {feeData.challanNo}</Text>
            <Text>Due Date: {feeData.dueDate}</Text>
            <Text>Status: {feeStatus}</Text>

            <Text>Fee Items:</Text>
            {feeData.items.map((it, idx) => (
              <Text key={idx}>
                - {it.title}: Rs. {it.amount}
              </Text>
            ))}

            <Text>Total Payable: Rs. {feeData.totalAmount}</Text>

            <Button
              title={`Toggle Fee Status (Currently: ${feeStatus})`}
              onPress={() => setFeeStatus(feeStatus === 'PAID' ? 'UNPAID' : 'PAID')}
            />
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
        <SafeAreaView>
          <ScrollView>
            {renderNavButtons('Course & Teacher Feedback')}

            <Text>Select Course:</Text>
            {feedback.map((f, idx) => (
              <Button
                key={idx}
                title={`${f.course} ${feedbackCourseIndex === idx ? '(Selected)' : ''}`}
                onPress={() => setFeedbackCourseIndex(idx)}
              />
            ))}

            <Text>TEACHER FEEDBACK TO CLASS:</Text>
            <Text>"{activeItem.teacherFeedback}"</Text>

            <Text>REVIEWS FROM OTHER STUDENTS (ANONYMOUS - NO NAMES):</Text>
            {activeItem.studentReviews.map((rev, rIdx) => (
              <View key={rIdx}>
                <Text>
                  • Anonymous Student ({rev.rating}/5 stars): "{rev.comment}"
                </Text>
              </View>
            ))}

            <Text>ADD YOUR ANONYMOUS REVIEW:</Text>
            <TextInput
              value={newReviewText}
              onChangeText={setNewReviewText}
              placeholder="Write review here..."
            />
            <Button title="Submit Anonymous Review" onPress={addStudentReview} />
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return null;
}
