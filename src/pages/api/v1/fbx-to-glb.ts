import type { APIRoute } from 'astro';
import type { Buffer } from 'node:buffer';
import {
  convertFbxToGlb,
  FbxConvertError,
} from '@/modules/import/services/convert-fbx';

function toArrayBuffer(buf: Buffer): ArrayBuffer {
  return buf.buffer.slice(
    buf.byteOffset,
    buf.byteOffset + buf.byteLength,
  ) as ArrayBuffer;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const contentType = request.headers.get('content-type') ?? '';
    if (!contentType.includes('multipart/form-data')) {
      return new Response('Expected multipart/form-data', { status: 400 });
    }

    const formData = await request.formData();
    const file = formData.get('file');
    if (!(file instanceof File)) {
      return new Response('Missing "file" field', { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const glbBuffer = await convertFbxToGlb(file.name, arrayBuffer);

    return new Response(toArrayBuffer(glbBuffer), {
      status: 200,
      headers: {
        'content-type': 'model/gltf-binary',
        'content-disposition': `attachment; filename="${file.name.replace(/\.fbx$/i, '.glb')}"`,
      },
    });
  } catch (err) {
    if (err instanceof FbxConvertError) {
      return new Response(err.message, { status: err.status });
    }
    console.error('[fbx-to-glb]', err);
    return new Response('Conversion failed', { status: 500 });
  }
};
