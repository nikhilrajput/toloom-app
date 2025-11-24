import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

export function GallerySkeleton() {
  const skeletonHeights = [200, 250, 180, 220, 240, 190, 210, 230, 200, 250, 180, 220];

  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 4, 1200: 6 }}
    >
      <Masonry gutter="60px">
        {skeletonHeights.map((height, index) => (
          <div
            key={index}
            style={{
              width: '100%',
              height: `${height}px`,
              backgroundColor: '#E0E0E0',
              animation: 'pulse 1.5s ease-in-out infinite',
              borderRadius: '0'
            }}
          />
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
}
