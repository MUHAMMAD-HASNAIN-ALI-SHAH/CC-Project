import { useNavigate } from "react-router-dom";

export default function WPPCompiler() {
  const navigate = useNavigate();
  const members = [
    { id: 1, name: "HADIA EJAZ", reg: "23-CS-02" },
    { id: 2, name: "MUHAMMAD HASNAIN ALI SHAH", reg: "23-CS-51" },
    { id: 3, name: "MUHAMMAD SHAHZAIB", reg: "23-CS-145" },
  ];

  const features = [
    {
      icon: "🔍",
      title: "Scanner",
      description:
        "Tokenizes C++ source code and produces a full statistical report: token types, category breakdown, identifiers, literals, and line distribution.",
      label: "TOKEN ANALYSIS",
      route: "/scanner",
    },
    {
      icon: "🧠",
      title: "Parser",
      description:
        "Performs full syntax analysis — detects errors with exact line and column numbers, builds a symbol table, and highlights source code errors.",
      label: "SYNTAX ANALYSIS",
      route: "/parser",
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-200 via-blue-100 to-blue-300 p-8">
      <div className="flex flex-col gap-6 w-full max-w-2xl">
        {/* Group Info Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-6">
            <h1 className="text-5xl font-bold text-blue-600">WPP Compiler</h1>
            <p className="text-lg text-gray-400 mt-1">Group Information</p>
          </div>

          <table className="w-full text-sm">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="py-2.5 px-3 text-left rounded-tl-lg rounded-bl-lg w-8">
                  #
                </th>
                <th className="py-2.5 px-3 text-left font-semibold">
                  Member Name
                </th>
                <th className="py-2.5 px-3 text-right font-semibold rounded-tr-lg rounded-br-lg">
                  Registration No
                </th>
              </tr>
            </thead>
            <tbody>
              {members.map((m, i) => (
                <tr
                  key={m.id}
                  className={
                    i < members.length - 1 ? "border-b border-gray-100" : ""
                  }
                >
                  <td className="py-3 px-3 text-gray-500 font-medium">
                    {m.id}
                  </td>
                  <td className="py-3 px-3 text-gray-800 font-medium tracking-wide">
                    {m.name}
                  </td>
                  <td className="py-3 px-3 text-right text-gray-600">
                    {m.reg}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-2 gap-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-3"
            >
              <div className="text-4xl">{f.icon}</div>
              <h2 className="text-lg font-bold text-gray-800">{f.title}</h2>
              <p className="text-sm text-gray-400 leading-relaxed flex-1">
                {f.description}
              </p>
              <button
                onClick={() => navigate(f.route)}
                className="cursor-pointer self-start mt-1 bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-bold tracking-widest px-4 py-2 rounded-lg transition-colors"
              >
                {f.label}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
