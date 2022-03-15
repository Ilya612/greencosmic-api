import Courses from "../Models/courses.js";
import Lessons from "../Models/lessons.js";
import Steps from "../Models/steps.js";
import User from "../Models/user.js";
import CourseDescription from "../Models/courseDescription.js";
import CoursesProgress from "../Models/coursesProgress.js";
import LessonsProgress from "../Models/lessonsProgress.js";
import StepsProgress from "../Models/stepsProgress.js";

class courseService {
  async create(body) {
    /* let example = {
      courseName: "sdasd",
      lessons: [
        {
          lessonName: "sdasdasd",
          steps: [
            { stepName: "asdasd", stepType: "asdasd", stepContent: "sadasd" },
            { stepName: "asdasd", stepType: "asdasd", stepContent: "sadasd" },
            { stepName: "asdasd", stepType: "asdasd", stepContent: "sadasd" },
            { stepName: "asdasd", stepType: "asdasd", stepContent: "sadasd" },
          ],
        },
        {
          lessonName: "sdasdasd",
          steps: [
            { stepName: "asdasd", stepType: "asdasd", stepContent: "sadasd" },
            { stepName: "asdasd", stepType: "asdasd", stepContent: "sadasd" },
            { stepName: "asdasd", stepType: "asdasd", stepContent: "sadasd" },
          ],
        },
      ],
    };
    const course = await Course.create(body);*/
    await this.createCourse(body).then(() => {
      let courseName = body.courseName;
      body.lessons.forEach((el) => {
        el.courseName = courseName;
        this.createLesson(el).then((el) => {
          let lessonName = el.lessonName;
          el.steps.forEach((p) => {
            p.lessonName = lessonName;
            p.courseName = courseName;
            this.createSteps(p);
          });
        });
      });
    });

    return;
  }
  async createCourse(body) {
    await Courses.create(body);
    return body;
  }
  async createLesson(body) {
    await Lessons.create(body);
    return body;
  }
  async createSteps(body) {
    await Steps.create(body);
    return body;
  }
  async createCourseDescription(body) {
    await CourseDescription.create(body);
    return;
  }
  async getCourseDescription(body) {
    console.log("popal");
    const courseDescription = await CourseDescription.findOne({
      courseName: body.courseName,
    });
    console.log(courseDescription);
    if (!courseDescription) {
      return { message: "course not found" };
    }
    return courseDescription;
  }

  /*async createStep(body) {
    const step = await Course.findOne({ courseName: body.courseName });
    if (!step) {
      return { message: "course not found" };
    }
    await step.steps.push({
      stepName: body.stepName,
      stepFilling: body.stepFilling,
    });
    step.save();
    return step;
  }*/
  async getCourses() {
    const courses = await Courses.find();
    const courses_array = courses.map((p) => {
      p = {
        courseName: p.courseName,
        svgImage: p.svgImage,
      };
      return p;
    });

    return courses_array;
  }
  async getLessons(body) {
    const course = await Courses.findOne({ courseName: body.courseName });
    if (!course) {
      return { message: "course not found" };
    }
    return course;
  }
  async getSteps(body) {
    const steps = await Lessons.findOne({
      courseName: body.courseName,
      lessonName: body.lessonName,
    });
    if (!steps) {
      return { message: "lesson not found" };
    }
    return steps;
  }
  async getOneStep(body) {
    const step = await Steps.findOne({
      courseName: body.courseName,
      lessonName: body.lessonName,
      stepName: body.stepName,
    });

    if (!step) {
      return { message: "step not found" };
    }
    console.log("poluchil shag");
    console.log(step);
    return step;
  }
  async createProgress(body) {
    const isAlreadyCreated = await CoursesProgress.findOne({
      courseName: body.courseName,
      user: body._id,
    });
    if (isAlreadyCreated) {
      return { message: "progress is already created" };
    }
    const course = await Courses.findOne({ courseName: body.courseName });
    if (!course) {
      return { message: "course not found" };
    }

    const user = await User.findById({ _id: body._id });
    if (!user) {
      return { message: "user not found" };
    }
    try {
      await CoursesProgress.create({
        user: user._id,
        courseName: course.courseName,
        lessons: course.lessons,
      }).then((courseProgress) => {
        courseProgress.lessons.map((p) => {
          this.findLesson({
            courseName: course.courseName,
            lessonName: p.lessonName,
          }).then((lessons) => {
            this.createLessonsProgress({
              user: user._id,
              courseName: course.courseName,
              lessonName: lessons.lessonName,
              steps: lessons.steps,
            }).then((lessonsProgress) => {
              lessonsProgress.steps.map((j) => {
                this.createStepsProgress({
                  user: user._id,
                  courseName: course.courseName,
                  lessonName: lessons.lessonName,
                  stepName: j.stepName,
                });
              });
            });
          });
        });
      });
    } catch (error) {
      console.log(error);
      return { message: "smth went wrong" };
    }
    return;
  }
  async findLesson(body) {
    const lessons = await Lessons.findOne(body);
    return lessons;
  }
  async createLessonsProgress(body) {
    const lessonsProgress = await LessonsProgress.create(body);
    return lessonsProgress;
  }
  async createStepsProgress(body) {
    await StepsProgress.create(body);
    return;
  }
  async postProgress(body) {
    const step = await StepsProgress.findOne({
      user: body._id,
      courseName: body.courseName,
      lessonName: body.lessonName,
      stepName: body.stepName,
    });
    if (!step) {
      return { message: "step not found" };
    }
    if (step.passed) {
      return;
    }
    step.passed = true;
    step.save();
    const lesson = await LessonsProgress.findOne({
      user: body._id,
      courseName: body.courseName,
      lessonName: body.lessonName,
    });
    lesson.steps.map((p) => {
      if (p.stepName == body.stepName) {
        p.passed = true;
      }
    });
    lesson.save();
    await this.checkLessons(body);
    return;
  }
  async checkLessons(body) {
    const lesson = await LessonsProgress.findOne({
      courseName: body.courseName,
      lessonName: body.lessonName,
    });
    let i = 0;
    lesson.steps.map((step) => {
      if (step.passed == true) {
        i++;
      }
    });
    if (i == lesson.steps.length) {
      const course = await CoursesProgress.findOne({
        courseName: body.courseName,
      });
      let lessonsPassed = 0;
      course.lessons.map((p) => {
        if (p.lessonName == lesson.lessonName) {
          p.passed = true;
        }
        if (p.passed) {
          lessonsPassed++;
        }
      });
      if (lessonsPassed == course.lessons.length) {
        course.passed = true;
      }
      course.save();
    }
    return;
  }
  async getProgressLessons(body) {
    const lessonsProgress = await CoursesProgress.find({ user: body._id });
    if (!lessonsProgress) {
      return;
    }
    return { lessonsProgress };
  }
  async getProgressSteps(body) {
    const stepsProgress = await LessonsProgress.find({ user: body._id });
    if (!stepsProgress) {
      return;
    }
    return { stepsProgress };
  }
  /**
   * OLD
   */
  /*async getPersonalCourse(body) {
    const personalCourse = await Courses.findById(body.id);
    if (!personalCourse) {
      return { message: "course not found" };
    }

    const step = personalCourse.steps[body.currentPage];
    const courseTitle = personalCourse.courseName;
    const courseLength = personalCourse.steps.length;

    if (!step) {
      return { message: "step not found" };
    }

    return { step, courseLength, courseTitle };
  }*/
  /* async postProgress(data) {
    const user = await User.findById(data.userData.id);
    if (!user) {
      return { message: "user not found" };
    }

    let coincidence = false;
    let number;
    for (let j = 0; j < user.courses.length; j++) {
      if (data.body.courseId === user.courses[j].courseId) {
        coincidence = true;
        number = j;
      }
    }

    if (coincidence === false) {
      await this.createProgress(data);
    }
    const updatedUserData = await User.findById(data.userData.id);

    if (!number) {
      number = updatedUserData.courses.length - 1;
    }

    updatedUserData.courses[number].steps[data.body.stepNumber] = true;

    updatedUserData.save();

    return updatedUserData.courses[number];
  }*/
  /*async createProgress(data) {
    const user = await User.findById(data.userData.id);

    if (!user) {
      return { message: "user not found" };
    }
    const courseProgress = await Course.findById(data.body.courseId);

    if (!courseProgress) {
      return { message: "course not found" };
    }
    const userCourse = {
      courseId: data.body.courseId,
      steps: [],
    };

    for (let i = 0; i < courseProgress.steps.length; i++) {
      if (i == 0) {
        userCourse.steps.push(true);
      } else {
        userCourse.steps.push(false);
      }
    }
    await user.courses.push(userCourse);

    user.save();
    return;
  }*/
  /*async getProgress(data) {
    const user = await User.findById(data.userData.id);
    if (!user) {
      return { message: "user not found" };
    }
    let courseProgress;
    for (let i = 0; i < user.courses.length; i++) {
      if (data.body.courseId === user.courses[i].courseId) {
        courseProgress = user.courses[i].steps;
      }
    }

    return courseProgress;
  }*/
}

export default new courseService();
