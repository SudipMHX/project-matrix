"use client";
import Card from "@/components/ui/Card";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { user } = useAuth();
  console.log(user);
  return (
    <section>
      <div className='container mx-auto py-20 px-2'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          <Card
            title='🔢 Nth Largest Number'
            description='Generate a custom list of even numbers and find the N-th largest among them. A simple utility for exploring sequences and practicing algorithmic thinking.'
            route='/largest-number'
          />
          <Card
            title='2️⃣ N Even Numbers'
            description='Generates a specified quantity (N) of even numbers, which are integers perfectly divisible by two. This tool provides a sequence of these numbers based on the requested count.'
            route='/even-number'
          />
          <Card
            title='✖️ Matrix Multiplication'
            description='Performs the operation of multiplying two matrices together, resulting in a new matrix. This process follows specific rules of combining elements from the rows of the first matrix and the columns of the second.'
            route='/matrix-multiply'
          />
        </div>
      </div>
    </section>
  );
}
