import Link from "next/link";

const sizeCharts = {
  tops: {
    headers: ["Size", "Chest (cm)", "Waist (cm)", "Hip (cm)"],
    rows: [
      ["XS", "76–81", "61–66", "84–89"],
      ["S", "84–89", "69–74", "91–96"],
      ["M", "91–96", "76–81", "99–104"],
      ["L", "99–104", "84–89", "107–112"],
      ["XL", "107–112", "91–96", "114–119"],
      ["XXL", "114–119", "99–104", "122–127"],
    ],
  },
  bottoms: {
    headers: ["Size", "Waist (cm)", "Hip (cm)", "Inseam (cm)"],
    rows: [
      ["XS", "61–66", "84–89", "76"],
      ["S", "69–74", "91–96", "78"],
      ["M", "76–81", "99–104", "79"],
      ["L", "84–89", "107–112", "80"],
      ["XL", "91–96", "114–119", "81"],
      ["XXL", "99–104", "122–127", "82"],
    ],
  },
  shoes: {
    headers: ["EU", "UK", "US (Men)", "US (Women)", "CM"],
    rows: [
      ["36", "3.5", "4", "5.5", "22.5"],
      ["37", "4", "4.5", "6", "23"],
      ["38", "5", "5.5", "7", "24"],
      ["39", "6", "6.5", "8", "24.5"],
      ["40", "6.5", "7", "8.5", "25"],
      ["41", "7", "7.5", "9", "25.5"],
      ["42", "8", "8.5", "10", "26.5"],
      ["43", "9", "9.5", "11", "27"],
      ["44", "9.5", "10", "11.5", "27.5"],
      ["45", "10.5", "11", "12.5", "28.5"],
    ],
  },
};

function SizeTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-emerald-700 text-white">
            {headers.map((h) => (
              <th key={h} className="px-4 py-3 text-left font-semibold">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              {row.map((cell, j) => (
                <td key={j} className={`px-4 py-3 ${j === 0 ? "font-bold text-emerald-700" : "text-gray-700"}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function SizeGuidePage() {
  return (
    <div className="px-4 lg:px-20 py-6">
      <div className="mb-10">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">Size Guide</h1>
        <p className="text-gray-600 max-w-2xl">
          Use our size charts to find your perfect fit. All measurements are in centimetres unless stated otherwise.
          When between sizes, we recommend sizing up.
        </p>
      </div>

      {/* How to Measure */}
      <div className="bg-emerald-50 rounded-2xl p-6 lg:p-8 mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">How to Measure</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-gray-700">
          <div>
            <p className="font-semibold text-gray-900 mb-1">Chest</p>
            <p>Measure around the fullest part of your chest, keeping the tape horizontal.</p>
          </div>
          <div>
            <p className="font-semibold text-gray-900 mb-1">Waist</p>
            <p>Measure around your natural waistline, the narrowest part of your torso.</p>
          </div>
          <div>
            <p className="font-semibold text-gray-900 mb-1">Hip</p>
            <p>Measure around the fullest part of your hips, about 20cm below your waist.</p>
          </div>
        </div>
      </div>

      {/* Tops */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Tops & Dresses</h2>
        </div>
        <div className="p-4">
          <SizeTable {...sizeCharts.tops} />
        </div>
      </div>

      {/* Bottoms */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Bottoms & Trousers</h2>
        </div>
        <div className="p-4">
          <SizeTable {...sizeCharts.bottoms} />
        </div>
      </div>

      {/* Shoes */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-10">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Footwear</h2>
        </div>
        <div className="p-4">
          <SizeTable {...sizeCharts.shoes} />
        </div>
      </div>

      {/* Still unsure */}
      <div className="bg-gray-50 rounded-2xl p-6 text-center">
        <h3 className="font-bold text-gray-900 mb-2">Still not sure about your size?</h3>
        <p className="text-gray-600 text-sm mb-4">Our support team is happy to help you find the right fit.</p>
        <Link
          href="/contact"
          className="inline-block px-6 py-2.5 bg-emerald-700 text-white rounded-xl text-sm font-semibold hover:bg-emerald-800 transition"
        >
          Contact Support
        </Link>
      </div>
    </div>
  );
}
