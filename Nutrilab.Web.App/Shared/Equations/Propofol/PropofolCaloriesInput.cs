using Nutrilab.Web.App.Shared.Equations;
namespace Nutrilab.Web.App.Shared.Equations.Propofol
{
  public class PropofolCaloriesInput : PatientEquationInput
  {
    public const double PROPOFOL_SOLUTION_CONCENTRATION = 0.1; // (10mg/ml in 10% lipid emulsion)
    public const double PROPOFOL_SOLUTION_KCAL_ML = 1.1;

    public PropofolCaloriesInput(PatientInfo patientInfo) : base(patientInfo)
    {
    }

    public double DosageMcgKgMin { get; set; }
    public double DurationHr { get; set; }
    public double PropofolSolutionConcentration { get; } = PROPOFOL_SOLUTION_CONCENTRATION;
    public double PropofolSolutionKcalMl { get; } = PROPOFOL_SOLUTION_KCAL_ML;
  }
}

