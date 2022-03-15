import courseService from "../Service/courseService.js";
class courseController {
  async create(req, res) {
    try {
      const course = await courseService.create(req.body);
      return res.status(200).json(course);
    } catch (error) {
      res.status(400).json(error);
    }
  }
  async createCourseDescription(req, res) {
    try {
      if (!req.body.courseName || !req.body.mainImage || !req.body.blocks) {
        return res.status(400).json({ message: "not found" });
      }
      await courseService.createCourseDescription(req.body);
      return res.status(200).json();
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }
  async getCourseDescription(req, res) {
    try {
      if (!req.body.courseName) {
        return res.status(400).json({ message: "not found" });
      }

      const courseDescription = await courseService.getCourseDescription(
        req.body
      );

      return res.status(200).json(courseDescription);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }
  async getCourses(req, res) {
    try {
      const courses = await courseService.getCourses();

      return res.status(200).json(courses);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }
  async getLessons(req, res) {
    try {
      if (!req.body.courseName) {
        return res.status(400).json({ message: "not found" });
      }
      const lessons = await courseService.getLessons(req.body);
      return res.status(200).json(lessons);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }
  async getSteps(req, res) {
    try {
      console.log(req.body);
      if (!req.body.courseName || !req.body.lessonName) {
        return res.status(400).json({ message: "not found" });
      }
      const steps = await courseService.getSteps(req.body);
      return res.status(200).json(steps);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }
  async getOneStep(req, res) {
    try {
      if (!req.body.courseName || !req.body.lessonName || !req.body.stepName) {
        return res.status(400).json({ message: "not found" });
      }
      const step = await courseService.getOneStep(req.body);
      return res.status(200).json(step);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }
  async createProgress(req, res) {
    try {
      if (!req.body.courseName || !req.body._id) {
        return res.status(400).json({ message: "not found" });
      }
      await courseService.createProgress(req.body);
      return res.status(200).json();
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }
  async postProgress(req, res) {
    try {
      if (
        !req.body.courseName ||
        !req.body._id ||
        !req.body.lessonName ||
        !req.body.stepName
      ) {
        return res.status(401).json({ message: "not found" });
      }
      await courseService.postProgress(req.body);
      return res.status(200).json();
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }
  async getProgressLessons(req, res) {
    try {
      if (!req.body._id) {
        return res.status(400).json({ message: "not found" });
      }
      const progressLessons = await courseService.getProgressLessons(req.body);
      return res.status(200).json(progressLessons);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }
  async getProgressSteps(req, res) {
    try {
      if (!req.body._id) {
        return res.status(400).json({ message: "not found" });
      }
      const progressSteps = await courseService.getProgressSteps(req.body);
      return res.status(200).json(progressSteps);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }
  /**
   * OLD OLD OLD OLD OLD
   */
  /*async getPersonalCourse(req, res) {
    try {
      const personalCourse = await courseService.getPersonalCourse(req.body);

      return res.status(200).json(personalCourse);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }*/
  /*async postProgress(req, res) {
    try {
      let data = {
        body: req.body,
        userData: req.user,
      };

      const progress = await courseService.postProgress(data);
      return res.status(200).json(progress);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }*/
  /* async getProgress(req, res) {
    try {
      let data = {
        body: req.body,
        userData: req.user,
      };
      const courseProgress = await courseService.getProgress(data);
      return res.status(200).json(courseProgress);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }*/
}
export default new courseController();
