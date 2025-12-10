import { AttributeViewProps } from "@meridian-ui/meridian";

export const AttributeSalaryRange = ({ attribute }: AttributeViewProps) => {
  const salaryData = attribute.value;

  if (!salaryData || typeof salaryData !== 'object') return null;

  const { min, max, currency, period } = salaryData;

  const formatSalary = (amount: number) => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    return formatter.format(amount);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="font-semibold text-green-700">
        {formatSalary(min)} - {formatSalary(max)}
      </span>
      {period && (
        <span className="text-sm text-gray-500">/ {period}</span>
      )}
    </div>
  );
};
