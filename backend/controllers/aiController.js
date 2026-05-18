const Employee = require("../models/Employee");

const aiShortlist = async (req, res) => {

  try {

    const {
      requiredSkills = [],
      minExperience = 0,
    } = req.body;

    const employees = await Employee.find();

    const rankedEmployees = employees.map((employee) => {

      // CASE-INSENSITIVE SKILL MATCHING
      const matchedSkills = employee.skills.filter((skill) =>

        requiredSkills
          .map((s) => s.toLowerCase())
          .includes(skill.toLowerCase())

      );

      // SKILL SCORE
      const skillScore =
        requiredSkills.length > 0
          ? (matchedSkills.length /
              requiredSkills.length) * 100
          : 0;

      // EXPERIENCE BONUS
      const expBonus =
        employee.experience >= minExperience
          ? 20
          : 0;

      // PERFORMANCE BONUS
      const performanceBonus =
        employee.performanceScore >= 80
          ? 20
          : 0;

      // FINAL SCORE
      const totalScore = Math.min(
        skillScore + expBonus + performanceBonus,
        100
      );

      return {

        name: employee.name,

        email: employee.email,

        department: employee.department,

        skills: employee.skills,

        performanceScore:
          employee.performanceScore,

        experience: employee.experience,

        matchScore:
          totalScore.toFixed(2),

        recommendation:

          totalScore >= 80
            ? "Promotion Recommended"

            : totalScore >= 60
            ? "Training Recommended"

            : "Needs Improvement",

        feedback:

          totalScore >= 80

            ? "Excellent employee with strong performance and skills."

            : totalScore >= 60

            ? "Good employee but can improve certain skills."

            : "Employee requires performance improvement and training.",
      };
    });

    // SORT BY HIGHEST SCORE
    rankedEmployees.sort(
      (a, b) => b.matchScore - a.matchScore
    );

    res.json({

      success: true,

      message:
        "AI Recommendation Generated",

      rankedEmployees,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message:
        "AI Recommendation Failed",

    });
  }
};

module.exports = { aiShortlist };