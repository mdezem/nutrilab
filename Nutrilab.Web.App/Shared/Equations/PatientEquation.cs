using Nutrilab.Web.App.Shared.Services.Nutrition;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nutrilab.Web.App.Shared.Equations
{
  public abstract class PatientEquation 
  {
    public string Name { get; set;  }

    public string Group { get; set; }

    public PatientInfo PatientInfo { get; private set; }

    public BMI Bmi { get; private set; }

    protected PatientEquation (string name, PatientInfo patientInfo, string group)
    {
      Name = name;
      PatientInfo = patientInfo;
      Bmi = new BMI(patientInfo);
      Group = group;
    }


    public virtual bool Update()
    {
      Errors.Clear();
      if (!Bmi.Update())
      {
        // todo add errors
        return false;
      }
      Validate();
      if (Errors.Count > 0)
      {
        State = PatientEquationState.ValiationError;
        Result = 0;
        return false;
      }

      if (!Accept())
      {
        State = PatientEquationState.NotApply;
        Result = 0;
        return false;
      }

      Result = ComputeValue();
      State = PatientEquationState.Ok;
      return true;
    }

    public List<EquationError> Errors { get; } = new();

    public void AddError(string errorMessage, string fieldName)
    {
      Errors.Add(new EquationError()
      {
        FieldName = fieldName,
        ErrorMessage = errorMessage
      });
    }

    public void AddError(string errorMessage)
    {
      Errors.Add(new EquationError()
      {
        FieldName = "*",
        ErrorMessage = errorMessage
      });
    }

    public double Result { get; private set; }

    public PatientEquationState State { get; private set; }

    protected abstract double ComputeValue();

    public virtual bool Validate() => true;

    public virtual bool Accept() => true;

  }
}
