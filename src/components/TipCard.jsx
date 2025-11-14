export default function TipCard({ t }) {
  return (
    <div className="border rounded p-3">
      <h4 className="font-semibold">{t.title}</h4>
      <p className="text-xs text-gray-600">by {t.authorName || t.author}</p>

      <p className="mt-1 text-sm">
        {t.content?.length > 100 ? t.content.slice(0, 100) + "..." : t.content}
      </p>
    </div>
  );
}