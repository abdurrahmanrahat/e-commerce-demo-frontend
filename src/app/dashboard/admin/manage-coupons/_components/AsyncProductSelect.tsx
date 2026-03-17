"use client";

import NoDataFound from "@/components/shared/Ui/Data/NoDataFound";
import MyImage from "@/components/shared/Ui/Image/MyImage";
import { LoaderSpinner } from "@/components/shared/Ui/Loader/LoaderSpinner";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import useDebounced from "@/hooks/useDebounced";
import { TProduct } from "@/types";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

type Props = {
  name: string;
};

export default function AsyncProductSelect({ name }: Props) {
  const { control, setValue, watch } = useFormContext();

  // Form stores only IDs
  const selectedIds: string[] = watch(name) || [];

  // UI state stores full product objects
  const [selectedProducts, setSelectedProducts] = useState<TProduct[]>([]);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<TProduct[]>([]);
  const [loading, setLoading] = useState(false);

  const debounced = useDebounced(query, 500);

  useEffect(() => {
    if (!debounced.trim()) {
      setResults([]);
      return;
    }

    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKED_URL}/products?searchTerm=${debounced}`,
          { signal: controller.signal },
        );

        const data = await res.json();
        const products: TProduct[] = data?.data?.data || [];

        // remove already selected
        const filtered = products.filter((p) => !selectedIds.includes(p._id));

        setResults(filtered);
      } catch (err) {
        if ((err as any).name !== "AbortError") console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    return () => controller.abort();
  }, [debounced, selectedIds]);

  const addProduct = (product: TProduct) => {
    if (!selectedIds.includes(product._id)) {
      const newIds = [...selectedIds, product._id];

      setValue(name, newIds, {
        shouldValidate: true,
        shouldDirty: true,
      });

      setSelectedProducts((prev) => [...prev, product]);

      setResults((prev) => prev.filter((p) => p._id !== product._id));
    }
  };

  const removeProduct = (id: string) => {
    const removedProduct = selectedProducts.find((p) => p._id === id);

    const newIds = selectedIds.filter((p) => p !== id);

    setValue(name, newIds, {
      shouldValidate: true,
      shouldDirty: true,
    });

    setSelectedProducts((prev) => prev.filter((p) => p._id !== id));

    if (removedProduct) {
      setResults((prev) => [...prev, removedProduct]);
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      render={() => (
        <div className="space-y-2">
          {/* Selected Products */}
          <div className="flex flex-wrap gap-2">
            {selectedProducts.map((product) => (
              <Badge
                key={product._id}
                className="bg-primary text-white flex items-center gap-1"
              >
                <MyImage
                  src={product.images[0]}
                  alt={product.name}
                  className="h-5 w-5 rounded-full object-cover"
                  width={20}
                  height={20}
                />

                {product.name}

                <button
                  type="button"
                  onClick={() => removeProduct(product._id)}
                >
                  <X className="w-3 h-3 ml-1" />
                </button>
              </Badge>
            ))}
          </div>

          {/* Search Input */}
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
          />

          {/* Dropdown */}
          {query && (
            <div className="border border-muted rounded-md max-h-60 overflow-auto">
              {loading ? (
                <div className="text-center py-8">
                  <LoaderSpinner />
                  <p className="text-sm text-gray-500 mt-2 animate-pulse">
                    Searching...
                  </p>
                </div>
              ) : results.length > 0 ? (
                results.map((p) => (
                  <div
                    key={p._id}
                    onClick={() => addProduct(p)}
                    className="p-2 cursor-pointer hover:bg-primary hover:text-white transition-all flex items-center gap-2"
                  >
                    <MyImage
                      src={p.images[0]}
                      alt={p.name}
                      className="h-8 w-8 rounded-full object-cover border border-border"
                      width={32}
                      height={32}
                    />
                    <p className="text-sm">{p.name}</p>
                  </div>
                ))
              ) : (
                <NoDataFound
                  title="Products not found!"
                  description={`We couldn’t find any products with the query: ${query}`}
                />
              )}
            </div>
          )}
        </div>
      )}
    />
  );
}
