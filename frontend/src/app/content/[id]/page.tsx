import Link from "next/link";

type PageProps = { params: { id: string } };

export default function ContentDetailPage({ params }: PageProps) {
  const { id } = params;
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-2">Content #{id}</h1>
      <p className="text-sm text-gray-500 mb-6">Details and tipping actions will go here.</p>
      <div className="border rounded p-6">Placeholder for content view</div>
      <div className="mt-6">
        <Link href="/feed" className="text-blue-600 underline">Back to Feed</Link>
      </div>
    </div>
  );
}


