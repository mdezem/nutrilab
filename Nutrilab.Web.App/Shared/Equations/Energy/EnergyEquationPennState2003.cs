namespace Nutrilab.Web.App.Shared.Equations.Energy
{
  public class EnergyEquationPennState2003 : EnergyEquationVentilatedPatients
  {
    public EnergyEquationPennState2003(PatientInfo patientInfo) : base("Penn State 2003", patientInfo)
    {
    }

    public override bool Accept()
    {
      return Bmi.Result.Value < 30 || Input.AgeYr < 60;
    }

    protected override void ComputeValue(ref EnergyEquationOutput output)
    {
      output ??= new();

      var msj = new EnergyEquationMifflinStJeor(PatientInfo);

      if (msj.Update())
      {
        output.ResultKCalDay =
          0.96 * msj.Result.ResultKCalDay
          + 167 * Input.TemperatureMaxC
          + 31 * Input.VentilationLMin
          - 6212;
      }
      // todo, add errors
    }
  }
}

