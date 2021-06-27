namespace Nutrilab.Web.App.Shared.Services.Nutrition
{
  public class EnergyEquationPennState2003 : EnergyEquationVentilatedPatients
  {
    public EnergyEquationPennState2003(PatientInfo patientInfo) : base("Penn State 2003", patientInfo)
    {
    }

    public override bool Accept()
    {
      return Bmi.Result < 30 || AgeYr < 60;
    }

    protected override double ComputeValue()
    {
      var msj = new EnergyEquationMifflinStJeor(PatientInfo);
      if (msj.Update())
      {
        return 0.96 * msj.Result + 167 * TemperatureMaxC + 31 * VentilationLMin - 6212;
      }
      // todo, add errors
      return 0;
    }
  }
}

