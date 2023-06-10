<?php

namespace App\Src\Company;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class CompanyController extends Controller
{
    private $validator;

    private $repository;
    function __construct(CompanyValidator $validator, CompanyRepository $repository)
    {
        $this->validator = $validator;
        $this->repository = $repository;
    }

    public function index(Request $request): JsonResponse
    {
        $per_page = $request->input('pageSize') ?? 10;

        $current_page = $request->input('pageNo') ?? 1;

        $starting_point = $per_page * ($current_page - 1);

        $total = Company::get()->count();

        $data = Company::orderBy('created_at', 'ASC')
            ->take($per_page)
            ->skip($starting_point)
            ->get()
            ->toArray();  

        $array= new Paginator($data, $per_page, $current_page);

        $params = collect([
            'total' => $total,
            'count' => $array->count(),
            'is_last_page' => (($array->count() < $per_page) || (($current_page - 1) * $per_page) + $array->count() == $total)
        ]);

        $ret = $params->merge($array);

        return response()->json($ret);
    }

    public function create(Request $request): JsonResponse
    {
        $company = new Company;
        return response()->json(['data' => $company]);
    }

    public function store(Request $request): JsonResponse
    {
        abort_if($request->user()->cannot('create-company', Company::class), 403);

        $validated = $this->validator->validateCreate($request);

        $company = $this->repository->createCompany($validated);

        // SendOrderToVendor::dispatch($order)->onQueue('orders');

        // NewOrderPlaced::dispatch($order);
        
        return response()->json(['data' => $company]);
    }

    public function edit(Company $company): JsonResponse
    {
        return response()->json([
            'data' => $company
        ]);
    }

    public function update(Request $request, Company $company): JsonResponse
    {
        abort_if($request->user()->cannot('edit-company', Company::class), 403);

        $validated = $this->validator->validateUpdate($request);

        $company = $this->repository->updateCompany($company, $validated);

        // SendOrderToVendor::dispatch($order)->onQueue('orders');

        // NewOrderPlaced::dispatch($order);
        
        return response()->json(['data' => $company]);
    }

    public function delete(Company $company): bool
    {
        return $company->delete();
    }
    public function deleteBatch(Request $request): JsonResponse
    {
        Company::destroy($request->all());
        return response()->json([]);
    }
}
