namespace Nutrilab.Web.App.Shared.Equations
{
  public class Anthropometrics : PatientEquation<AnthropometricsOutput>
  {
    public Anthropometrics(PatientInfo patientInfo) : base("Anthropometrics", patientInfo, "General")
    {
    }

    protected override void ComputeValue(ref AnthropometricsOutput output)
    {
      output ??= new();

      output.IdealBodyWeight = WeightUtils.IdealBodyWeightKg(PatientInfo.Gender, PatientInfo.HeightCm);
      output.NutritionalBodyWeight = WeightUtils.NutritionalBodyWeightKg(PatientInfo.Gender, Bmi);
    }
  }

  public class AnthropometricsOutput
  {
    public double ActualBodyWeight { get; set; }
    public double IdealBodyWeight { get; set; }
    public double NutritionalBodyWeight { get; set; }

  }
}

