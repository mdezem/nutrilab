using Nutrilab.Web.App.Shared.Equations;

namespace Nutrilab.Web.App.Shared.Services.Nutrition
{
  public class Anthropometrics : PatientEquation
  {
    public Anthropometrics(PatientInfo patientInfo, string group) : base("Anthropometrics", patientInfo, "General")
    {
    }

    public double ActualBodyWeight { get; set; }
    public double IdealBodyWeight { get; set; }
    public double NutritionalBodyWeight { get; set; }

    protected override double ComputeValue()
    {
      IdealBodyWeight = WeightUtils.IdealBodyWeightKg(PatientInfo.Gender, Bmi.HeightCm);
      NutritionalBodyWeight = WeightUtils.NutritionalBodyWeightKg(PatientInfo.Gender, Bmi);
      return 0;
    }
  }
}

