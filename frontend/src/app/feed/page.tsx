export default function FeedPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Feed</h1>
      <p className="text-sm text-gray-500 mb-6">Content cards will appear here with tip progress.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border rounded p-4">Example content card (placeholder)</div>
        <div className="border rounded p-4">Example content card (placeholder)</div>
      </div>
    </div>
  );
}


