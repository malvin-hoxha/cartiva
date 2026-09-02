import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Star } from "lucide-react";

const ProductCard = ({ product }) => {
  return (
    <Link
      to={product.href}
      className="
        group
        relative
        min-w-0
        rounded-[20px]
        border border-[#ebe2e3]
        bg-white
        p-2.5
        shadow-[20px_20px_30px_rgba(0,0,0,0.02)]
        transition-all duration-200
        hover:shadow-[20px_20px_30px_rgba(0,0,0,0.06)]
      "
    >
      <div className="overflow-hidden rounded-[20px]">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="
            aspect-[4/5]
            w-full
            object-cover
            object-top
            transition-transform
            duration-300
            group-hover:scale-[1.03]
          "
        />
      </div>

      <div className="px-1 pb-3 pt-3 text-left">
        <span className="text-xs text-[#606063]">
          {product.brand}
        </span>

        <h5 className="pt-1 text-sm font-medium text-[#1a1a1a]">
          {product.title}
        </h5>

        <div className="mt-2 flex gap-0.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={13}
              className="fill-[#f3b519] text-[#f3b519]"
            />
          ))}
        </div>

        <h4 className="pt-2 text-[15px] font-bold text-[#088178]">
          {product.price}
        </h4>
      </div>

      <span
        className="
          absolute
          bottom-5
          right-4
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-full
          border border-[#cce7d0]
          bg-[#e8f6ea]
          text-[#088178]
          transition
          hover:bg-[#088178]
          hover:text-white
        "
      >
        <ShoppingCart size={18} />
      </span>
    </Link>
  );
};

export default ProductCard;
