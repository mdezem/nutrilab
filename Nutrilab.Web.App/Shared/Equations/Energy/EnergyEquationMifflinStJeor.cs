namespace Nutrilab.Web.App.Shared.Services.Nutrition
{
  public class EnergyEquationMifflinStJeor : EnergyEquation
  {
    public EnergyEquationMifflinStJeor(PatientInfo patientInfo): base("Mifflin St Jeor", patientInfo, "Energy|General")
    {

    }

    protected override double ComputeValue()
    {
      var c = Gender == Gender.Male ? 5d : -161d;
      return 10d * WeightKg + 6.25d * HeightCm - 5 * AgeYr + c;
    }
  }
}

